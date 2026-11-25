import { useAuth } from "../context/AuthContext.jsx";

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

export default function Header({ currentPage = "goals", onNavigate }) {
  const { user, isAuthenticated, signInDevUser, signOut } = useAuth();

  return (
    <header className="navbar navbar-expand navbar-light bg-light border-bottom px-3 mb-4">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Tomato220</span>

        <nav className="navbar-nav me-auto gap-2">
          <button
            type="button"
            className={`btn btn-sm ${
              currentPage === "goals" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => onNavigate?.("goals")}
          >
            Goals
          </button>
          <button
            type="button"
            className={`btn btn-sm ${
              currentPage === "stats" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => onNavigate?.("stats")}
          >
            Stats
          </button>
        </nav>

        <div className="d-flex align-items-center gap-2">


            <i className="bi bi-person-circle fs-4 text-primary" aria-hidden="true"></i>

            
          {isAuthenticated && user ? (
            <>
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-semibold"
                style={{ width: "32px", height: "32px", fontSize: "0.8rem" }}
                aria-hidden="true"
              >
                {getInitials(user.name) || "U"}
              </span>
              <span className="fw-medium">{user.name}</span>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary ms-2"
                onClick={signOut}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-circle bg-secondary text-white"
                style={{ width: "32px", height: "32px", fontSize: "0.85rem" }}
                aria-hidden="true"
              >
                ?
              </span>
              <span className="text-muted">Guest</span>
              <button
                type="button"
                className="btn btn-sm btn-primary ms-2"
                onClick={signInDevUser}
              >
                Dev Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}