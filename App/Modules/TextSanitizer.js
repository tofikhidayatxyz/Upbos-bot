const cleanTextUtils = use('clean-text-utils')
const textCleaner = use('text-cleaner')

const sanitateText = text => {
  text = cleanTextUtils.replace.diacritics(text)
  text = cleanTextUtils.replace.smartChars(text)
  text = cleanTextUtils.replace.exoticChars(text)
  text = cleanTextUtils.strip.emoji(text)
  text = cleanTextUtils.strip.extraSpace(text)
  text = cleanTextUtils.strip.gutenberg(text)
  text = cleanTextUtils.strip.newlines(text)
  text = cleanTextUtils.strip.nonASCII(text)
  text = cleanTextUtils.strip.punctuation(text)
  text = cleanTextUtils.strip.bom(text)

  text = textCleaner(text)
    .stripHtml()
    .condense()
    .toLowerCase()
    .removeApostrophes()
    .removeChars()
    .remove(process.env.BOT_NAME)
    .trim()
    .valueOf()

  return text
}

module.exports = sanitateText
