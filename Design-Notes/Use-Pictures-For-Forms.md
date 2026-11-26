

I would use transparent PNGs (or vector-traced SVGs) cropped straight from your artwork and apply them to your Reactstrap components using CSS border-image for the stretchy input box and background-image for the fixed-size button.
Using real artwork textures instead of math-generated filters is actually how professional game UIs and punk zine sites get that exact hand-inked look. Here is how to structure it cleanly so it still works with Reactstrap and stays responsive.

1. Prep Your Two Image Assets

Export two separate cropped pieces from your mockup with transparent backgrounds:

    A. input-border.png: Just the hollow red hand-drawn rectangle for the input field (transparent inside so the page background shows through).

    B. submit-btn.png: The solid red paint-brushed button shape (without the "ADD KEYWORD" text, or with the text baked right into the image if you prefer).



2. The Input Box: Use CSS border-image (9-Slice Scaling)

If you stretch a regular image across a wide <input>, the left and right borders get thick and blurry. CSS border-image solves this using 9-slice scaling—it locks the four corners in place and stretches only the middle edges.

import { Form, FormGroup, Input, Button } from 'reactstrap';

// Inside your component JSX:
<Form onSubmit={handleSubmit} className="d-flex align-items-center gap-3">
  <FormGroup className="mb-0 flex-grow-1">
    <Input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="ENTER KEYWORD..."
      className="punk-img-input"
    />
  </FormGroup>

  <Button type="submit" className="punk-img-btn">
    ADD KEYWORD
  </Button>
</Form>


.punk-img-input {
  background-color: transparent !important;
  border: 14px solid transparent !important; /* Thickness of your hand-drawn border */
  border-image-source: url('../assets/input-border.png');
  border-image-slice: 30; /* Cuts 30px in from each edge to protect the corners */
  border-image-repeat: stretch; /* Or 'round' to tile the rough texture without stretching */
  box-shadow: none !important; /* Removes Reactstrap's blue focus glow */
  color: #d92b2b !important;
  font-family: monospace;
}


Why border-image-repeat: round is worth trying: Instead of stretching the ink texture like rubber, round tiles the middle section seamlessly so the hand-drawn grit stays razor-sharp at any screen width.


3. The Submit Button: Use background-image

Because a submit button has a predictable size, you don't need 9-slice scaling—just strip Reactstrap's default button styling and layer your cropped stamp image behind the text:

.punk-img-btn {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  
  /* Your cropped button artwork */
  background-image: url('../assets/submit-btn.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  
  padding: 14px 28px !important;
  color: #f4f1ea !important; /* Off-white ink color */
  font-family: monospace;
  font-weight: bold;
  letter-spacing: 1px;
  transition: transform 0.1s ease;
}

.punk-img-btn:hover {
  transform: scale(1.03) rotate(-1deg);
}

.punk-img-btn:active {
  transform: scale(0.97);
}


Bonus Tip: Vector Tracing for Infinite Sharpness

If you ever want those cropped PNGs to look razor-sharp on 4K or Retina screens without pixelation, you can drop input-border.png and submit-btn.png into a free tool like Inkscape (Path -> Trace Bitmap) or Vectorpea to convert your exact pixel art into real <svg> files—giving you 100% fidelity to your mockup with infinite resolution.

If you want to push this setup further, let me know if you'd like help with:

    • Cropping and exporting tips (getting clean transparent edges without white halos)

    • Custom focus/hover states (swapping to a second distressed image on hover or click)

    • Integrating the space shuttle header into your Reactstrap layout
