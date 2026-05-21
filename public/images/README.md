# `#global` section background

Drop your dark background image as **`global-section-bg.png`** in this folder (`public/images/global-section-bg.png` → URL `/images/global-section-bg.png`). For WebP or JPG, replace the file and update the `url(...)` in `src/App.css` under `.section--global__photo` to match the filename.

`contact-pattern.png` — herringbone tile for `#contact` (`src/App.css`, `background-size` / `repeat` there).

`history-pattern.png` — carbon / dark weave **repeat tile** for `#history` (`src/App.css`). If your upload is a 4×4 sheet, crop one quadrant to 243×256 (or use `sips -c 256 243 --cropOffset 0 0` on the source) so `background-repeat: repeat` does not show the sheet’s internal grid lines. `background-size` / `repeat` live next to `#history.section--history`.
