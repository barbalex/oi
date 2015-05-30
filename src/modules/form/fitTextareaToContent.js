// setzt die Höhe von textareas so, dass der Text genau rein passt

'use strict'

module.exports = function (id, maxHeight) {
  var text,
    adjustedHeight

  if (id.currentTarget) {
    // id kam über event-Handler als dessen event rein
    text = id.currentTarget
  } else if (id && id.style) {
    // es wurde das element des textareas übergeben
    text = id
  } else {
    // es wurde die id eines textareas übergeben
    text = document.getElementById(id)
  }

  if (!text) {
    return
  }

  maxHeight = maxHeight || document.documentElement.clientHeight

  /* Accounts for rows being deleted, pixel value may need adjusting */
  if (text.clientHeight === text.scrollHeight) {
    text.style.height = '30px'
  }

  adjustedHeight = text.clientHeight
  if (!maxHeight || maxHeight > adjustedHeight) {
    adjustedHeight = Math.max(text.scrollHeight, adjustedHeight)
  }
  if (maxHeight) {
    adjustedHeight = Math.min(maxHeight, adjustedHeight)
  }

  // minimale Höhe soll 2px grösser sein, damit textareas nicht kleiner sind als inputs type text
  adjustedHeight += 2

  if (adjustedHeight > 34) {
    // Scrollbalken werden angezeigt, nicht schön > 2px grösser
    adjustedHeight += 2
  }

  if (adjustedHeight > text.clientHeight) {
    text.style.height = adjustedHeight + 'px'
  }
}
