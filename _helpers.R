# _helpers.R
# Shared base-R helpers for the static figures on the session pages.
# Sourced by a hidden setup chunk on each page. The leading underscore keeps
# Quarto from rendering this file as a page.

# Colours used across the app
col_blue   <- "#2f5d8a"
col_orange <- "#d9480f"
col_green  <- "#2f9e44"
col_grey   <- "#adb5bd"
seq_cols   <- function(k) hcl.colors(k, "Blues 3", rev = TRUE)
div_cols   <- function(k) hcl.colors(k, "Blue-Red 2")

# Row and column of each cell on a side x side grid, cells numbered row by row
grid_rc <- function(side) {
  data.frame(row = (seq_len(side^2) - 1) %/% side + 1,
             col = (seq_len(side^2) - 1) %% side + 1)
}

# Binary contiguity weights on a regular grid
grid_weights <- function(side, type = c("rook", "queen")) {
  type <- match.arg(type)
  rc <- grid_rc(side)
  dr <- abs(outer(rc$row, rc$row, "-"))
  dc <- abs(outer(rc$col, rc$col, "-"))
  W <- if (type == "rook") (dr + dc == 1) else (pmax(dr, dc) == 1)
  W * 1
}

row_standardize <- function(W) W / rowSums(W)

morans_i <- function(x, W) {
  z <- x - mean(x)
  (length(x) / sum(W)) * sum(W * outer(z, z)) / sum(z^2)
}

# Draw values on a side x side grid as a choropleth of square cells.
# breaks: class boundaries; cols: one colour per class.
draw_grid <- function(values, side, cols, breaks = NULL, main = "",
                      highlight = NULL, border = "white", labels = NULL,
                      label_cex = 0.7) {
  rc <- grid_rc(side)
  if (is.null(breaks)) {
    fill <- cols[values]
  } else {
    fill <- cols[findInterval(values, breaks, rightmost.closed = TRUE, all.inside = TRUE)]
  }
  plot(NA, xlim = c(0, side), ylim = c(0, side), asp = 1, axes = FALSE,
       xlab = "", ylab = "", main = main)
  rect(rc$col - 1, side - rc$row, rc$col, side - rc$row + 1, col = fill, border = border)
  if (!is.null(highlight)) {
    rect(rc$col[highlight] - 1, side - rc$row[highlight], rc$col[highlight],
         side - rc$row[highlight] + 1, border = "black", lwd = 2.5)
  }
  if (!is.null(labels)) {
    text(rc$col - 0.5, side - rc$row + 0.5, labels, cex = label_cex)
  }
}

# A legend strip under or beside a grid map
class_legend <- function(breaks, cols, digits = 1, title = NULL, x = "bottom", ...) {
  labs <- paste(formatC(head(breaks, -1), format = "f", digits = digits), "–",
                formatC(tail(breaks, -1), format = "f", digits = digits))
  legend(x, legend = labs, fill = cols, border = NA, bty = "n", title = title,
         cex = 0.7, horiz = FALSE, ...)
}

# A smooth random surface on a grid: noise smoothed by repeated neighbour averaging
smooth_surface <- function(side, steps = 6, seed = 1) {
  set.seed(seed)
  W <- row_standardize(grid_weights(side, "queen"))
  x <- rnorm(side^2)
  for (s in seq_len(steps)) x <- 0.5 * x + 0.5 * as.vector(W %*% x)
  as.vector(scale(x))
}

# Draw a labelled box with centred text (for hand-drawn diagrams)
box_node <- function(x, y, label, w = 1.6, h = 0.55, fill = "#ffffff",
                     border = "#495057", cex = 0.85, font = 1) {
  rect(x - w / 2, y - h / 2, x + w / 2, y + h / 2, col = fill, border = border, lwd = 1.5)
  text(x, y, label, cex = cex, font = font)
}

# A horizontal legend across the bottom of the whole figure (call after the panels;
# the panels must leave room with par(oma = c(2, 0, 0, 0)))
bottom_legend <- function(labels, cols, cex = 0.85) {
  par(fig = c(0, 1, 0, 1), oma = c(0, 0, 0, 0), mar = c(0, 0, 0, 0), new = TRUE)
  plot.new()
  legend("bottom", legend = labels, fill = cols, border = NA, horiz = TRUE, bty = "n", cex = cex)
}
