I would build this using CSS combined with inline SVG filters (feTurbulence and feDisplacementMap), avoiding raster images/bitmaps entirely.
The design in your mockup relies on three distinct visual tricks that you can achieve purely with clean, accessible HTML and modern CSS:
1. Rough, stamped edges (like an ink stamp or woodblock print).
2. Hard, offset drop shadows (giving it a bold, 2D comic/zine look).
3. Overlapping typography that breaks out of its container boundaries.
Here is how you can build each piece in a sophisticated, scalable, and responsive way without breaking standard form accessibility.


1. The Rough "Ink Stamp" Edges (SVG Filters)

Instead of drawing jagged borders by hand or using background PNGs, you can create an invisible SVG filter in your HTML and apply it to standard CSS borders and buttons using filter: url(#rough-edge).
This distorts the crisp mathematical lines of CSS into organic, stamped shapes while keeping the actual <input> and <button> elements 100% native and responsive.

<!-- Place this hidden SVG anywhere in your HTML body -->
<svg style="position: absolute; width: 0; height: 0;" aria-hidden="true">
  <filter id="ink-stamp">
    <!-- Generates organic noise -->
    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
    <!-- Uses the noise to warp the edges of your HTML element -->
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
  </filter>
</svg>

JSX Version:

{/* Place this hidden SVG anywhere in your React component tree */}
<svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
  <filter id="ink-stamp">
    {/* Generates organic noise */}
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.04"
      numOctaves="3"
      result="noise"
    />
    {/* Uses the noise to warp the edges of your HTML element */}
    <feDisplacementMap
      in="SourceGraphic"
      in2="noise"
      scale="4"
      xChannelSelector="R"
      yChannelSelector="G"
    />
  </filter>
</svg>


(Tip: Apply this filter to a pseudo-element like ::before rather than the <input> itself, otherwise the text inside the input box will also get warped!)


2. The Inputs & Hard Offset Shadows

In your image, the Email and Password fields have a thick red border, a solid red offset shadow on the bottom-right, and a slight tilt.
You can achieve this cleanly by wrapping standard <input> tags and styling a ::before pseudo-element for the border/shadow:

.crazy-input-wrapper {
  position: relative;
  margin-bottom: 1.5rem;
}

/* The rough border and hard shadow live here so the typed text stays crisp */
.crazy-input-wrapper::before {
  content: "";
  position: absolute;
  inset: 0;
  border: 3px solid #e61919;
  border-radius: 6px;
  background: #ffffff;
  /* Hard, unblurred offset shadow */
  box-shadow: 4px 4px 0px #e61919; 
  /* Applies the SVG rough edge */
  filter: url(#ink-stamp); 
  z-index: 0;
  transition: transform 0.15s ease;
}

/* Slight tilt on focus for extra personality */
.crazy-input-wrapper:focus-within::before {
  transform: rotate(-0.8deg) scale(1.01);
}

.crazy-input {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  outline: none;
}


4. The "SUBMIT" Cutout Button

The submit button is a solid red stamped pill where the white text SUBMIT is oversized and actually bleeds off the top and bottom edges of the red shape, creating a "knockout" effect.
You can build this with a standard <button> and a ::before background:

.crazy-submit {
  position: relative;
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 900;
  letter-spacing: 2px;
  padding: 0 24px;
  cursor: pointer;
  /* Keeps the text sharp while the background warps */
  line-height: 0.85; 
}

.crazy-submit::before {
  content: "";
  position: absolute;
  /* Makes the red pill shorter than the tall text so letters bleed out */
  top: 12%;
  bottom: 12%;
  left: 0;
  right: 0;
  background-color: #e61919;
  border-radius: 8px;
  box-shadow: 4px 4px 0px #b30000;
  filter: url(#ink-stamp);
  z-index: -1;
  transition: transform 0.1s ease;
}

.crazy-submit:active::before {
  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0px #b30000;
}



Why this approach wins:

• 100% Accessible & Semantic: Screen readers, password managers, and keyboard navigation see a completely normal <form>, <input>, and <button>.
• Infinitely Scalable: Because it's driven by CSS and vector math (SVG filters), it will look razor-sharp on any screen size or Retina display without loading heavy image assets.
• Interactive: You can animate the SVG baseFrequency or CSS transforms on :hover, :focus, and :active to make the ink feel alive when users interact with it.
Would you like a complete, copy-pasteable HTML/CSS snippet putting this whole login card together, or would you like tips on recreating the custom shuttle logo as an inline SVG?
