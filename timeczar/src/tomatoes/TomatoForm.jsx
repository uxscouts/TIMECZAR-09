import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";

const CATEGORY_OPTIONS = [
  { id: "1", label: "Code" },
  { id: "2", label: "Norsk" },
  { id: "3", label: "Study" },
  { id: "4", label: "Health" },
  { id: "5", label: "Guitar" },
  { id: "6", label: "Task" },
  { id: "7", label: "Exercise" },
  { id: "8", label: "Drawing" },
  { id: "9", label: "Design" },
  { id: "10", label: "Writing" },
  { id: "14", label: "Job Search" },
  { id: "20", label: "Business" },
  { id: "22", label: "Uncategorized (Deleted Category)" },
  { id: "23", label: "Kids" },
  { id: "24", label: "Organize" },
  { id: "25", label: "UX Scouts" },
  { id: "26", label: "UX/UI" }
];

function getTodayIso() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getIsoWeek(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

function formatNowstamp(date = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function buildEmptyForm(defaultDate = getTodayIso()) {
  return {
    title: "",
    category: "1",
    count: "1",
    tomdate: defaultDate,
    notes: "",
    URL: ""
  };
}

export default function TomatoForm({
  initialTomato = null,
  userid = "1001",
  defaultDate = getTodayIso(),
  onSaveTomato,
  onCancel
}) {
  const [formState, setFormState] = useState(() => buildEmptyForm(defaultDate));
  const [errorMessage, setErrorMessage] = useState("");
  const [lastSavedRecord, setLastSavedRecord] = useState(null);

  useEffect(() => {
    if (initialTomato) {
      setFormState({
        title: initialTomato.title || "",
        category: String(initialTomato.category || "1"),
        count: String(initialTomato.count || "1"),
        tomdate: initialTomato.tomdate || defaultDate,
        notes: initialTomato.notes || "",
        URL: initialTomato.URL && initialTomato.URL !== "URL" ? initialTomato.URL : ""
      });
    } else {
      setFormState(buildEmptyForm(defaultDate));
    }
    setErrorMessage("");
  }, [initialTomato, defaultDate]);

  const handleFieldChange = (fieldName) => (e) => {
    setFormState((prev) => ({ ...prev, [fieldName]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = formState.title.trim();
    const numericCount = Number(formState.count);

    if (!trimmedTitle) {
      setErrorMessage("Please enter a title for the tomato.");
      return;
    }

    if (!Number.isFinite(numericCount) || numericCount < 1) {
      setErrorMessage("Count must be at least 1.");
      return;
    }

    const parsedDate = new Date(`${formState.tomdate}T12:00:00`);
    const weekdayno = String(parsedDate.getDay() || 7);

    const rowPayload = {
      id: initialTomato?.id ? String(initialTomato.id) : String(Date.now()),
      userid: initialTomato?.userid || userid,
      title: trimmedTitle,
      tomdate: formState.tomdate,
      datestring: initialTomato?.datestring ?? null,
      timestamp: initialTomato?.timestamp ?? "",
      weekdayno,
      tomweek: getIsoWeek(formState.tomdate),
      count: String(Math.floor(numericCount)),
      category: formState.category,
      notes: formState.notes.trim() || trimmedTitle,
      URL: formState.URL.trim() ? formState.URL.trim() : null,
      nowstamp: initialTomato?.nowstamp || formatNowstamp()
    };

    setErrorMessage("");
    setLastSavedRecord(rowPayload);

    if (onSaveTomato) {
      onSaveTomato(rowPayload, Boolean(initialTomato));
    } else {
      console.log(initialTomato ? "Updated tomato row:" : "Created tomato row:", rowPayload);
    }

    if (!initialTomato) {
      setFormState(buildEmptyForm(formState.tomdate));
    }
  };

  const isEditing = Boolean(initialTomato);

  return (
    <Container className="my-4" style={{ maxWidth: "720px" }}>
      <Card className="shadow-sm">
        <CardBody>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 mb-0">
              {isEditing ? `Edit Tomato #${initialTomato.id}` : "Add New Tomato"}
            </h2>
            <Badge color="light" className="text-dark border">
              Week: {getIsoWeek(formState.tomdate)}
            </Badge>
          </div>

          {errorMessage && (
            <Alert color="danger" className="py-2">
              {errorMessage}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="tomato-title" className="fw-semibold">
                Title (<code>title</code>)
              </Label>
              <Input
                id="tomato-title"
                type="text"
                value={formState.title}
                onChange={handleFieldChange("title")}
                placeholder="e.g., Build Reactstrap category filter"
              />
            </FormGroup>

            {/* Stacked on handhelds (xs={12}), 3 equal columns on tablet/desktop (md={4}) */}
            <Row>
              <Col xs={12} md={4}>
                <FormGroup>
                  <Label for="tomato-category" className="fw-semibold">
                    Category (<code>category</code>)
                  </Label>
                  <Input
                    id="tomato-category"
                    type="select"
                    value={formState.category}
                    onChange={handleFieldChange("category")}
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label} (#{cat.id})
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>

              <Col xs={12} md={4}>
                <FormGroup>
                  <Label for="tomato-count" className="fw-semibold">
                    Tomatoes (<code>count</code>)
                  </Label>
                  <Input
                    id="tomato-count"
                    type="number"
                    min="1"
                    step="1"
                    value={formState.count}
                    onChange={handleFieldChange("count")}
                  />
                </FormGroup>
              </Col>

              <Col xs={12} md={4}>
                <FormGroup>
                  <Label for="tomato-date" className="fw-semibold">
                    Date (<code>tomdate</code>)
                  </Label>
                  <Input
                    id="tomato-date"
                    type="date"
                    value={formState.tomdate}
                    onChange={handleFieldChange("tomdate")}
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="tomato-url" className="fw-semibold">
                Reference URL (<code>URL</code>)
              </Label>
              <Input
                id="tomato-url"
                type="text"
                value={formState.URL}
                onChange={handleFieldChange("URL")}
                placeholder="https://... or leave blank for null"
              />
            </FormGroup>

            <FormGroup>
              <Label for="tomato-notes" className="fw-semibold">
                Notes (<code>notes</code>)
              </Label>
              <Input
                id="tomato-notes"
                type="textarea"
                rows="3"
                value={formState.notes}
                onChange={handleFieldChange("notes")}
                placeholder="Optional details—defaults to Title if left blank"
              />
            </FormGroup>

            <div className="d-flex gap-2">
              <Button type="submit" color="danger">
                {isEditing ? "Save Changes" : "Save Tomato"}
              </Button>

              {onCancel && (
                <Button type="button" color="secondary" outline onClick={onCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </Form>
        </CardBody>
      </Card>

      {lastSavedRecord && (
        <Card className="mt-3 bg-light">
          <CardBody className="py-2 px-3">
            <div className="small fw-semibold text-muted mb-1">
              Generated <code>tomato</code> Row Payload
            </div>
            <pre className="mb-0 small" style={{ overflowX: "auto" }}>
              {JSON.stringify(lastSavedRecord, null, 2)}
            </pre>
          </CardBody>
        </Card>
      )}
    </Container>
  );
}