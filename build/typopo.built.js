(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*----------------------------------------------------------------------------*\
 Variables & Character replacement sets
\*----------------------------------------------------------------------------*/

var nonLatinLowercase = "áäčďéěíĺľňóôöőŕřšťúüűůýžабвгґдезіийклмнопрстуфъыьцчжшїщёєюях";
var nonLatinUppercase = "ÁÄČĎÉĚÍĹĽŇÓÔÖŐŔŘŠŤÚÜŰŮÝŽАБВГҐДЕЗІИЙКЛМНОПРСТУФЪЫЬЦЧЖШЇЩЁЄЮЯХ";
var nonLatinChars = nonLatinLowercase + nonLatinUppercase;
var lowercaseChars = "a-z" + nonLatinLowercase;
var uppercaseChars = "A-Z" + nonLatinUppercase;
var allChars = lowercaseChars + uppercaseChars;
/*
 (39)			dumb single quote
 (8216)		left single quotation mark
 (8217)		right single quotation mark
 (700)		modifier letter apostrophe; https://en.wikipedia.org/wiki/Modifier_letter_apostrophe
 (8219)		single high-reversed-9 quotation mark
 (8242)		prime
 (8249)		single left-pointing angle quotation mark
 (8250)		single right-pointing angle quotation mark
 */
var singleQuoteAdepts = "‚|'|‘|’|ʼ|‛|′|‹|›";
var doubleQuoteAdepts = "„|“|”|\"|«|»|″|,{2,}|‘{2,}|’{2,}|'{2,}|‹{2,}|›{2,}|′{2,}";
var space = " ";
var nbsp = " ";
var hairSpace = " "; //&#8202;
var narrowNbsp = " "; //&#8239;
var spaces = space + nbsp + hairSpace + narrowNbsp;
var terminalPunctuation = "\.\!\?";
var sentencePunctuation = "\,\:\;" + terminalPunctuation; // there is no ellipsis in the set as it is being used throughout a sentence in the middle. Rethink this group to split it into end-sentence punctuation and middle sentence punctuation
var openingBrackets = "\\(\\[\\{";
var closingBrackets = "\\)\\]\\}";
var ellipsis = "…";
var degree = "°";

/*
 Source for webUrlPattern, emailAddressPattern
 http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.0_r1/android/text/util/Regex.java#Regex.0WEB_URL_PATTERN
 */
var webUrlPattern = "((?:(http|https|Http|Https|rtsp|Rtsp):\\/\\/(?:(?:[a-zA-Z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)" + "\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,64}(?:\\:(?:[a-zA-Z0-9\\$\\-\\_" + "\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,25})?\\@)?)?" + "((?:(?:[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}\\.)+" + // named host
"(?:" + // plus top level domain
"(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])" + "|(?:biz|b[abdefghijmnorstvwyz])" + "|(?:cat|com|coop|c[acdfghiklmnoruvxyz])" + "|d[ejkmoz]" + "|(?:edu|e[cegrstu])" + "|f[ijkmor]" + "|(?:gov|g[abdefghilmnpqrstuwy])" + "|h[kmnrtu]" + "|(?:info|int|i[delmnoqrst])" + "|(?:jobs|j[emop])" + "|k[eghimnrwyz]" + "|l[abcikrstuvy]" + "|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])" + "|(?:name|net|n[acefgilopruz])" + "|(?:org|om)" + "|(?:pro|p[aefghklmnrstwy])" + "|qa" + "|r[eouw]" + "|s[abcdeghijklmnortuvyz]" + "|(?:tel|travel|t[cdfghjklmnoprtvwz])" + "|u[agkmsyz]" + "|v[aceginu]" + "|w[fs]" + "|y[etu]" + "|z[amw]))" + "|(?:(?:25[0-5]|2[0-4]" + // or ip address
"[0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\\.(?:25[0-5]|2[0-4][0-9]" + "|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1]" + "[0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}" + "|[1-9][0-9]|[0-9])))" + "(?:\\:\\d{1,5})?)" + // plus option port number +
"(\\/(?:(?:[a-zA-Z0-9\\;\\/\\?\\:\\@\\&\\=\\#\\~" + // plus option query params
"\\-\\.\\+\\!\\*\\'\\(\\)\\,\\_])|(?:\\%[a-fA-F0-9]{2}))*)?" + "(?:\\b|$)"; // and finally, a word boundary or end of
// input.  This is to stop foo.sure from
// matching as foo.su


var emailAddressPattern = "[a-zA-Z0-9\\+\\.\\_\\%\\-]{1,256}" + "\\@" + "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" + "(" + "\\." + "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}" + ")+";

exports.default = {
  nonLatinLowercase: nonLatinLowercase,
  nonLatinUppercase: nonLatinUppercase,
  nonLatinChars: nonLatinChars,
  lowercaseChars: lowercaseChars,
  uppercaseChars: uppercaseChars,
  allChars: allChars,
  singleQuoteAdepts: singleQuoteAdepts,
  doubleQuoteAdepts: doubleQuoteAdepts,
  space: space,
  nbsp: nbsp,
  hairSpace: hairSpace,
  narrowNbsp: narrowNbsp,
  spaces: spaces,
  terminalPunctuation: terminalPunctuation,
  sentencePunctuation: sentencePunctuation,
  openingBrackets: openingBrackets,
  closingBrackets: closingBrackets,
  ellipsis: ellipsis,
  degree: degree,
  webUrlPattern: webUrlPattern,
  emailAddressPattern: emailAddressPattern
};

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.removeEmptyLines = removeEmptyLines;
/*
	Removes empty lines

	@param {string} string — input text for identification
	@returns {string} — output with removed empty lines
*/
function removeEmptyLines(string) {
	return string.replace(/^\s+/gm, "");
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceSymbols = replaceSymbols;
var symbols = {
  "\\(C\\)": "©",
  "\\(c\\)": "©",
  "\\(P\\)": "Ⓟ",
  "\\(p\\)": "Ⓟ",
  "\\(R\\)": "®",
  "\\(r\\)": "®",
  "\\(TM\\)": "™",
  "\\(tm\\)": "™",
  "\\+\\-": "±",
  "\\-\\+": "±"
};

function replaceSymbols(string) {
  for (var symbol in symbols) {
    var re = new RegExp(symbol, "g");
    string = string.replace(re, symbols[symbol]);
  }
  return string;
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.correct_typos = correct_typos;

var _symbolReplacements = require("./lib/symbol-replacements");

var _emptyLines = require("./lib/empty-lines");

var _constants = require("./lib/constants");

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exceptions = [];

/*----------------------------------------------------------------------------*\
	Esential replacements
\*----------------------------------------------------------------------------*/

/*!
 * Typopo 1.4.0
 *
 * Copyright 2015-17 Braňo Šandala
 * Released under the MIT license
 *
 * Date: 2017-01-15
 */

function replace_periods_with_ellipsis(string) {
	/* [1] replace 3 and more dots with an ellipsis */
	string = string.replace(/\.{3,}/g, "…");

	/* [2] replace 2 dots in the middle of the sentecne with an aposiopesis */
	var pattern = "[" + _constants2.default.spaces + "]\\.{2}[" + _constants2.default.spaces + "]";
	var re = new RegExp(pattern, "g");
	string = string.replace(re, " … ");

	/* [3] replace 2 dots at the end of the sentecne with full stop */
	string = string.replace(/\.{2}/g, ".");

	return string;
}

function remove_multiple_spaces(string) {
	return string.replace(/ {2,}/g, " ");
}

/*----------------------------------------------------------------------------*\
	Quotes, primes & apostrophes
\*----------------------------------------------------------------------------*/

/*
	Corrects improper use of double quotes and double primes

	Assumptions and Limitations
	This function assumes that double quotes are always used in pair,
	i.e. authors did not forget to close double quotes in their text.

	Algorithm
	[0] Remove extra terminal punctuation around double quotes
	[1] Swap right double quote adepts with a punctuation
	    (this comes first as it is a quite common mistake that may eventually
		  lead to improper identification of double primes)
	[2] Identify inches, arcseconds, seconds
	[3] Identify closed double quotes
	[4] Identify the rest as unclosed double quotes (best-effort replacement)
	[5] Fix spacing around quotes and primes
	[6] Swap back some of the double quotes with a punctuation
	[7] Remove extra punctuation around quotes
	[8] Replace all identified punctuation with appropriate punctuation in
	    given language

	@param {string} string — input text for identification
	@param {string} language — language option
	@returns {string} output with properly replaces double qoutes and double primes
*/
function correct_double_quotes_and_primes(string, language) {

	/* [0] Remove extra terminal punctuation around double quotes
 				 e.g. “We will continue tomorrow.”. */
	var pattern = "([" + _constants2.default.sentencePunctuation + "])(" + _constants2.default.doubleQuoteAdepts + ")([" + _constants2.default.sentencePunctuation + "])";
	var re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$2");

	/* [1] Swap right double quote adepts with a terminal punctuation */
	pattern = "(" + _constants2.default.doubleQuoteAdepts + ")([" + _constants2.default.terminalPunctuation + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, '$2$1');

	/* [2] Identify inches, arcseconds, seconds
 			 Note: we’re not using constants.doubleQuoteAdepts variable
 			 as commas and low-positioned quotes are ommited*/
	string = string.replace(/(\d ?)(“|”|\"|″|‘{2,}|’{2,}|'{2,}|′{2,})/g, "$1{{typopo__double-prime}}");

	/* [3] Identify closed double quotes */
	pattern = "(" + _constants2.default.doubleQuoteAdepts + ")(.*?)(" + _constants2.default.doubleQuoteAdepts + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{{typopo__left-double-quote}}$2{{typopo__right-double-quote}}");

	/* [4.1] Identify unclosed left double quote */
	pattern = "(" + _constants2.default.doubleQuoteAdepts + ")([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{{typopo__left-double-quote}}$2");

	/* [4.2] Identify unclosed right double quote */
	pattern = "([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + _constants2.default.sentencePunctuation + _constants2.default.ellipsis + "])(" + _constants2.default.doubleQuoteAdepts + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1{{typopo__right-double-quote}}");

	/* [4.3] Remove remaining unidentified double quote */
	pattern = "([" + _constants2.default.spaces + "])(" + _constants2.default.doubleQuoteAdepts + ")([" + _constants2.default.spaces + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3");

	/* [5] Fix spacing around quotes and prime */
	string = string.replace(/({{typopo__left-double-quote}})( )/g, "$1");
	string = string.replace(/( )({{typopo__right-double-quote}})/g, "$2");
	string = string.replace(/( )({{typopo__double-prime}})/g, "$2");

	/* [6] Swap back some of the double quotes with a punctuation
 		 Idea
 	 In [1] we have swapped all double right quotes by default with a terminal
 	 punctuation. However, not all double quotes wrap the whole sentence and
 	 there are cases when few words are quoted within a sentence. Take a look at
 	 examples:
 	 “Sentence qouted as a whole.” (full stop is placed within double quotes)
 	 This is “quoted expression.” (full stop is placed outside double quotes)
 		 Algorithm
 	 Match all the double quote pairs that do not precede sentence punctuation
 	 (and thus must be used within a sentence) and swap right double with
 	 a terminal punctuation.
 	 */
	pattern = "([^" + _constants2.default.sentencePunctuation + "][" + _constants2.default.spaces + "]{{typopo__left-double-quote}}.+?)([" + _constants2.default.terminalPunctuation + "])({{typopo__right-double-quote}})";
	// console.log(pattern);
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3$2");

	/* [7] Remove extra comma after punctuation in direct speech,
 				 e.g. "“Hey!,” she said" */
	pattern = "([" + _constants2.default.sentencePunctuation + "])([\,])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1");

	/* [8] Punctuation replacement */
	string = string.replace(/({{typopo__double-prime}})/g, "″");

	switch (language) {
		case "rue":
			string = string.replace(/({{typopo__left-double-quote}})/g, "«");
			string = string.replace(/({{typopo__right-double-quote}})/g, "»");
			break;
		case "sk":
		case "cs":
			string = string.replace(/({{typopo__left-double-quote}})/g, "„");
			string = string.replace(/({{typopo__right-double-quote}})/g, "“");
			break;
		case "en":
			string = string.replace(/({{typopo__left-double-quote}})/g, "“");
			string = string.replace(/({{typopo__right-double-quote}})/g, "”");
			break;
	}

	return string;
}

/*
	Corrects improper use of single quotes, single primes and apostrophes

	Assumptions and Limitations
	This function assumes that double quotes are always used in pair,
	i.e. authors did not forget to close double quotes in their text.
	Further, single quotes are used as secondary and they're properly spaced,
	e.g. ␣'word or sentence portion'␣ (and not like ␣'␣word␣'␣)

	Algorithm
	[1] Identify common apostrohe contractions
	[2] Identify single quotes
	[3] Identify feet, arcminutes, minutes
	[4] Identify residual apostrophes that have left
	[?] Swap right single quote adepts with a puntuation
			(We were swapping single quotes as part of algorithm a while a back,
			but since it is more probable that single quotes are in the middle of the
			sentence, we havae dropped swapping as a part of the algorithm)
	[6] Replace all identified punctuation with appropriate punctuation in
	    given language

	@param {string} string — input text for identification
	@param {string} language — language options
	@returns {string} — corrected output
*/
function correct_single_quotes_primes_and_apostrophes(string, language) {

	/* [1.1] Identify ’n’ contractions */
	var pattern = "(" + _constants2.default.singleQuoteAdepts + ")(n)(" + _constants2.default.singleQuoteAdepts + ")";
	var re = new RegExp(pattern, "gi");
	string = string.replace(re, "{{typopo__apostrophe}}$2{{typopo__apostrophe}}");

	/* [1.2] Identify common contractions at the beginning or at the end
 				 of the word, e.g. Fish ’n’ Chips, ’em, ’cause,… */
	var contraction_examples = "em|cause|twas|tis|til|round";
	pattern = "(" + _constants2.default.singleQuoteAdepts + ")(" + contraction_examples + ")";
	re = new RegExp(pattern, "gi");
	string = string.replace(re, "{{typopo__apostrophe}}$2");

	/* [1.3] Identify in-word contractions,
 				 e.g. Don’t, I’m, O’Doole, 69’ers */
	var character_adepts = "0-9" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars;
	pattern = "([" + character_adepts + "])(" + _constants2.default.singleQuoteAdepts + ")([" + character_adepts + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1{{typopo__apostrophe}}$3");

	/* [1.4] Identify year contractions
 	 e.g. ’70s, INCHEBA ’89,… */
	pattern = "(" + _constants2.default.singleQuoteAdepts + ")([0-9]{2})";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{{typopo__apostrophe}}$2");

	/* [2] Identify single quotes within double quotes */
	pattern = "(" + _constants2.default.doubleQuoteAdepts + ")(.*?)(" + _constants2.default.doubleQuoteAdepts + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, function ($0, $1, $2, $3) {

		//identify {{typopo__left-single-quote--adept}}
		var pattern = "( )(" + _constants2.default.singleQuoteAdepts + ")([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "])";
		var re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "$1{{typopo__left-single-quote--adept}}$3");

		//identify {{typopo__right-single-quote--adept}}
		pattern = "([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "])([\.,!?])?(" + _constants2.default.singleQuoteAdepts + ")([ ]|[\.,!?])";
		re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "$1$2{{typopo__right-single-quote--adept}}$4");

		//identify single quote pairs
		pattern = "({{typopo__left-single-quote--adept}})(.*?)({{typopo__right-single-quote--adept}})";
		re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "{{typopo__left-single-quote}}$2{{typopo__right-single-quote}}");

		return $1 + $2 + $3;
	});

	/* [3] Identify feet, arcminutes, minutes
 			 Note: we’re not using constants.singleQuoteAdepts variable
 			 as commas and low-positioned quotes are ommited*/
	string = string.replace(/(\d)( ?)('|‘|’|‛|′)/g, "$1{{typopo__single-prime}}");

	/* [4] Identify residual apostrophes that have left */
	pattern = "(" + _constants2.default.singleQuoteAdepts + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{{typopo__apostrophe}}");

	/* [5] Punctuation replacement */
	string = string.replace(/({{typopo__single-prime}})/g, "′");
	string = string.replace(/{{typopo__apostrophe}}|{{typopo__left-single-quote--adept}}|{{typopo__right-single-quote--adept}}/g, "’");

	switch (language) {
		case "rue":
			string = string.replace(/{{typopo__left-single-quote}}/g, "‹");
			string = string.replace(/{{typopo__right-single-quote}}/g, "›");
			break;
		case "sk":
		case "cs":
			string = string.replace(/{{typopo__left-single-quote}}/g, "‚");
			string = string.replace(/{{typopo__right-single-quote}}/g, "‘");
			break;
		case "en":
			string = string.replace(/{{typopo__left-single-quote}}/g, "‘");
			string = string.replace(/{{typopo__right-single-quote}}/g, "’");
	}

	return string;
}

function correct_multiple_sign(string) {
	return remove_multiple_spaces(string.replace(/([1-9]+[ ]{0,1}[a-wz]*)([ ]{0,1}[x|×][ ]{0,1})([1-9]+[ ]{0,1}[a-wz]*)/g, "$1 × $3"));
}

/*
	Replaces hyphen with em or en dash

	Algorithm
	[1] Replace 3 consecutive hyphens (---) with an em dash (—)
	[2] Replace 2 consecutive hyphens (--) with an en dash (—)
	[3] Replace any hyphen or dash surrounded with spaces with an em dash
	[4] Replace hyphen or dash used in number range with an en dash
			and set proper spacing

	@param {string} string — input text for identification
	@returns {string} — output with dashes instead of hyphens
*/
function replace_hyphen_with_dash(string, language) {
	var dashes = "-–—"; // including a hyphen

	/* [1] Replace 3 consecutive hyphens (---) with an em dash (—) */
	string = string.replace(/(---)/g, "—");

	/* [2] Replace 2 consecutive hyphens (--) with an en dash (—) */
	string = string.replace(/(--)/g, "–");

	/* [3] Replace any hyphen or dash surrounded with spaces with an em dash */
	var pattern = "[" + _constants2.default.spaces + "][" + dashes + "][" + _constants2.default.spaces + "]";
	var re = new RegExp(pattern, "g");
	var replacement = _constants2.default.narrowNbsp + "—" + _constants2.default.hairSpace;
	string = string.replace(re, replacement);

	/* [4.1] Replace hyphen or dash, placed between 2 cardinal numbers,
 				 with an en dash; including cases when there is an extra space
 				 from either one side or both sides of the dash */
	var cardinal_number = "\\d+";
	pattern = "(" + cardinal_number + ")([" + _constants2.default.spaces + "]?[" + dashes + "][" + _constants2.default.spaces + "]?)(" + cardinal_number + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1–$3");

	/* [4.2] Replace hyphen or dash, placed between 2 ordinal numbers,
 				 with an en dash; including cases when there is an extra space
 				 from either one side or both sides of the dash */
	var ordinal_indicator = "";
	switch (language) {
		case "rue":
		case "sk":
		case "cs":
			ordinal_indicator = "\\.";
			break;
		case "en":
			ordinal_indicator = "st|nd|rd|th";
			break;
	}
	pattern = "(" + cardinal_number + ")(" + ordinal_indicator + ")([" + _constants2.default.spaces + "]?[" + dashes + "][" + _constants2.default.spaces + "]?)(" + cardinal_number + ")(" + ordinal_indicator + ")";
	re = new RegExp(pattern, "gi");
	string = string.replace(re, "$1$2–$4$5");

	return string;
}

function replace_dash_with_hyphen(string) {
	var pattern = "([" + _constants2.default.lowercaseChars + "])([–—])([" + _constants2.default.lowercaseChars + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1-$3");
}

/*----------------------------------------------------------------------------*\
	Consolidation of spaces
\*----------------------------------------------------------------------------*/

function remove_space_before_punctuation(string) {
	var pattern = "([" + _constants2.default.spaces + "])([" + _constants2.default.sentencePunctuation + _constants2.default.closingBrackets + _constants2.default.degree + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$2");
}

function remove_space_after_punctuation(string) {
	var pattern = "([" + _constants2.default.openingBrackets + "])([" + _constants2.default.spaces + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1");
}

function remove_trailing_spaces(string) {
	return string.trim();
}

function add_space_before_punctuation(string) {
	var pattern = "([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "])([" + _constants2.default.openingBrackets + "])([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1 $2$3");
}

function add_space_after_punctuation(string) {
	var pattern = "([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "])([" + _constants2.default.sentencePunctuation + _constants2.default.closingBrackets + "])([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1$2 $3");
}

/*
	Removes extra spaces at the beginning of each paragraph

	This could be done with a one-liner:
	return string.replace(/^\s+/gm, "");

	However, it also removes empty lines. Since, we want to handle this change
	separately, we need to
	[1] split the lines manually
	[2] and remove extra spaces at the begining of each line
	[3] join lines together to a single string

	@param {string} string — input text for identification
	@returns {string} — output with removed spaces at the beginning of paragraphs
*/
function remove_spaces_at_paragraph_beginning(string) {
	/* [1] split the lines manually */
	var lines = string.split(/\r?\n/);

	/* [2] and remove extra spaces at the begining of each line */
	for (var i = 0; i < lines.length; i++) {
		lines[i] = lines[i].replace(/^\s+/, "");
	}

	/* [3] join lines together to a single string */
	return lines.join("\n");
}

/*
	Consolidates the use of non-breaking spaces

	* removes characters between multi-character words
	* adds non-breaking spaces after cardinal numbers
	* adds non-breaking spaces around ×
	* adds non-breaking spaces after single-character prepositions

	@param {string} string — input text for identification
	@returns {string} — output with correctly placed non-breaking space
*/
function consolidate_nbsp(string) {

	// removes non-breaking spaces between multi-character words
	var pattern = "([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "]{2,})([" + _constants2.default.nbsp + _constants2.default.narrowNbsp + "])([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "]{2,})";
	var re = new RegExp(pattern, "g");
	string = string.replace(re, "$1 $3");
	string = string.replace(re, "$1 $3"); //calling it twice to catch odd/even occurences


	// adds non-breaking spaces after cardinal numbers
	pattern = "([0-9]+)( )([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "]+)";
	re = new RegExp(pattern, "g");
	var replacement = "$1" + _constants2.default.nbsp + "$3";
	string = string.replace(re, replacement);

	// adds non-breaking spaces around ×
	pattern = "([" + _constants2.default.spaces + "])([×])([" + _constants2.default.spaces + "])";
	re = new RegExp(pattern, "g");
	replacement = _constants2.default.nbsp + "$2" + _constants2.default.nbsp;
	string = string.replace(re, replacement);

	// adds non-breaking spaces after single-character prepositions
	pattern = "([  ])([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "]|&)( )";
	re = new RegExp(pattern, "g");
	replacement = "$1$2" + _constants2.default.nbsp;
	string = string.replace(re, replacement);
	string = string.replace(re, replacement); //calling it twice to catch odd/even occurences

	return string;
}

/*
	Corrects improper spacing around ellipsis and aposiopesis

	Ellipsis (as a character) is used for 2 different purposes:
	1. as an ellipsis to ommit a piece of information deliberately
	2. as an aposiopesis; a figure of speech wherein a sentence is
	deliberately broken off and left unfinished

	sources
	https://en.wikipedia.org/wiki/Ellipsis
	https://en.wikipedia.org/wiki/Aposiopesis
	http://www.liteera.cz/slovnik/vypustka

	Algorithm
	Ellipsis & Aposiopesis require different use of spacing around them,
	that is why we are correcting only following cases:
	errors:
	[1] correct spacing, when ellipsis used used around commas
	[2] correct spacing for aposiopesis at the end of the sentence in the middle of the paragraph
	[3] correct spacing for aposiopesis at the beginning of the sentence in the middle of the paragraph
	[4] correct spacing for aposiopesis at the beginning of the sentence at the beginning of the paragraph
	[5] correct spacing for aposiopesis at the end of the sentence at the end of the paragraph

	@param {string} string — input text for identification
	@returns {string} — output with corrected spacing around aposiopesis
*/
function correct_spaces_around_ellipsis(string) {

	/* [1] correct spacing, when ellipsis used used around commas */
	var pattern = ",[" + _constants2.default.spaces + "]?" + _constants2.default.ellipsis + "[" + _constants2.default.spaces + "]?,";
	var re = new RegExp(pattern, "g");
	string = string.replace(re, ", …,");

	/* [2] correct spacing for aposiopesis at the end of the sentence
 			 in the middle of the paragraph */
	pattern = "([" + _constants2.default.lowercaseChars + "])([" + _constants2.default.spaces + "])(" + _constants2.default.ellipsis + "[" + _constants2.default.spaces + "][" + _constants2.default.uppercaseChars + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3");

	/* [3] correct spacing for aposiopesis at the beginning of the sentence
 			 in the middle of the paragraph */
	pattern = "([" + _constants2.default.sentencePunctuation + "][" + _constants2.default.spaces + "]" + _constants2.default.ellipsis + ")([" + _constants2.default.spaces + "])([" + _constants2.default.lowercaseChars + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3");

	/* [4] correct spacing for aposiopesis at the beginning of the sentence
 			 at the beginning of the paragraph */
	pattern = "(^…)([" + _constants2.default.spaces + "])([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "])";
	re = new RegExp(pattern, "gm");
	string = string.replace(re, "$1$3");

	/* [5] correct spacing for aposiopesis at the end of the sentence
 			 at the end of the paragraph */
	pattern = "([" + _constants2.default.lowercaseChars + _constants2.default.sentencePunctuation + "])([" + _constants2.default.spaces + "])(" + _constants2.default.ellipsis + ")(?![ " + _constants2.default.sentencePunctuation + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3");

	return string;
}

/*
	Corrects accidental uppercase

	Best-effort function to fix most common accidental uppercase errors, namely:
	[1] 2 first uppercase letters (ie. UPpercase)
	[2] Swapped cases (ie. uPPERCASE)

	Algorithm does not fix other uppercase eventualities,
	e.g. mixed case (UppERcaSe) as there are many cases for corporate brands
	that could potentially match the algorithm as false positive.

	@param {string} string — input text for identification
	@returns {string} — output with corrected accidental uppercase
*/
function correct_accidental_uppercase(string) {

	/* [1] two first uppercase letters (i.e. UPpercase) */
	var pattern = "[" + _constants2.default.uppercaseChars + "]{2,2}[" + _constants2.default.lowercaseChars + "]+";
	var re = new RegExp(pattern, "g");
	string = string.replace(re, function (string) {
		return string.substring(0, 1) + string.substring(1).toLowerCase();
	});

	/* [2.1] Swapped cases (2-letter cases, i.e. iT)
 		Note that this is divided into 2 separate cases as \b in JavaScript regex
 		does not take non-latin characters into a cosnideration
 */
	pattern = "[" + _constants2.default.lowercaseChars + "][" + _constants2.default.uppercaseChars + "]\\b";
	re = new RegExp(pattern, "g");
	string = string.replace(re, function (string) {
		return string.substring(0, 1) + string.substring(1).toLowerCase();
	});

	/* [2.2] Swapped cases (n-letter cases, i.e. uPPERCASE) */
	pattern = "[" + _constants2.default.lowercaseChars + "]+[" + _constants2.default.uppercaseChars + "]{2,}";
	re = new RegExp(pattern, "g");
	string = string.replace(re, function (string) {
		return string.substring(0, 1) + string.substring(1).toLowerCase();
	});

	return string;
}

/*----------------------------------------------------------------------------*\
	Abbreviations
\*----------------------------------------------------------------------------*/
/*
	Identifies differently-spelled abbreviations and replaces it with
	a temp variable, {{typopo__[abbr]}}

	Identifies given abbreviations:
	a.m., p.m., e.g., i.e.

	Algorithm
	[1] Identify e.g., i.e.
	[2] Identify a.m., p.m. (different match to avoid false positives such as:
			I am, He is the PM.)
	[3] Exclude false identifications

	@param {string} input text for identification
	@returns {string} corrected output
*/
function identify_common_abbreviations(string) {

	/* [1] Identify e.g., i.e. */
	var abbreviations = ["eg", "ie"];
	for (var i = 0; i < abbreviations.length; i++) {
		var pattern = "(\\b[" + abbreviations[i][0] + "]\\.?[" + _constants2.default.spaces + "]?[" + abbreviations[i][1] + "]\\.?)([" + _constants2.default.spaces + "]?)(\\b)";
		// console.log(pattern);
		var re = new RegExp(pattern, "gi");
		var replacement = "{{typopo__" + abbreviations[i] + "}} ";
		string = string.replace(re, replacement);
	}

	/* [2] Identify a.m., p.m. */
	abbreviations = ["am", "pm"];
	for (var i = 0; i < abbreviations.length; i++) {
		var pattern = "(\\d)([" + _constants2.default.spaces + "]?)(\\b[" + abbreviations[i][0] + "]\\.?[" + _constants2.default.spaces + "]?[" + abbreviations[i][1] + "]\\.?)([" + _constants2.default.spaces + "]?)(\\b|\\B)";
		var re = new RegExp(pattern, "gi");
		replacement = "$1 {{typopo__" + abbreviations[i] + "}} ";
		string = string.replace(re, replacement);
	}

	/* [3] Exclude false identifications
 	 Regex \b does not catch non-latin characters so we need to exclude false
 	 identifications
 */
	abbreviations = ["eg", "ie", "am", "pm"];
	for (var i = 0; i < abbreviations.length; i++) {
		// non-latin character at the beginning
		var pattern = "([" + _constants2.default.nonLatinChars + "])({{typopo__" + abbreviations[i] + "}})";
		var re = new RegExp(pattern, "g");
		replacement = "$1" + abbreviations[i];
		string = string.replace(re, replacement);

		// non-latin character at the end
		pattern = "({{typopo__" + abbreviations[i] + "}} )([" + _constants2.default.nonLatinChars + "])";
		re = new RegExp(pattern, "g");
		replacement = abbreviations[i] + "$2";
		string = string.replace(re, replacement);
	}

	return string;
}

/*
	Replaces identified temp abbreviation variable like {{typopo__eg}},
	with their actual representation

	@param {string} input text for identification
	@returns {string} corrected output
*/
function place_common_abbreviations(string) {
	var abbreviations = ["eg", "ie", "am", "pm"];
	for (var i = 0; i < abbreviations.length; i++) {
		var pattern = "{{typopo__" + abbreviations[i] + "}}";
		var re = new RegExp(pattern, "g");
		var replacement = abbreviations[i][0] + "." + abbreviations[i][1] + ".";
		string = string.replace(re, replacement);
	}

	return string;
}

/*----------------------------------------------------------------------------*\
	Exceptions
\*----------------------------------------------------------------------------*/

/*
	Identifies exceptions that will be ommited from correction of any sort

	Algorithm
	[1] Identify email adresses
	[2] Identify web URLs and IPs
	[3] Mark them as temporary exceptions in format {{typopo__exception-[i]}}

	@param {string} input text for identification of exceptions
	@returns {string} — output with identified exceptions in format {{typopo__exception-[i]}}
*/
function identify_exceptions(string) {

	/* [1] Identify email adresses */
	identify_exception_set(string, _constants2.default.emailAddressPattern);

	/* [2] Identify web URLs and IPs */
	identify_exception_set(string, _constants2.default.webUrlPattern);

	/* [3] Mark them as temporary exceptions in format {{typopo__exception-[i]}} */
	for (var i = 0; i < exceptions.length; i++) {
		var replacement = "{{typopo__exception-" + i + "}}";
		string = string.replace(exceptions[i], replacement);
	}

	return string;
}

/*
	Identifies set of exceptions for given pattern
	Used as helper function for identify_exceptions(string)

	@param {string} input text for identification of exceptions
	@param {pattern} regular expression pattern to match exception
*/
function identify_exception_set(string, pattern) {
	var re = new RegExp(pattern, "g");
	var matched_exceptions = string.match(re);
	if (matched_exceptions != null) {
		exceptions = exceptions.concat(matched_exceptions);
	}
}

/*
	Replaces identified exceptions with real ones by change their
	temporary representation in format {{typopo__exception-[i]}} with its
	corresponding representation

	@param {string} input text with identified exceptions
	@returns {string} output with placed exceptions
*/
function place_exceptions(string) {
	for (var i = 0; i < exceptions.length; i++) {
		var pattern = "{{typopo__exception-" + i + "}}";
		var re = new RegExp(pattern, "g");
		var replacement = exceptions[i];
		string = string.replace(re, replacement);
	}

	return string;
}

/*----------------------------------------------------------------------------*\
	Main script
\*----------------------------------------------------------------------------*/

/*
	Correct typos in the predefined order


	@param {string} string — input text for correction
	@param {language} string — language option to correct specific typos; supported languages: en, sk, cs, rue. if not specified, English typos are corrected
	@param {remove_lines} boolean — optional parameter allowing you to choose whether to remove empty lines or not
	@returns {string} — corrected output
*/
function correct_typos(string, language, configuration) {
	language = typeof language === "undefined" ? "en" : language;

	configuration = typeof configuration === "undefined" ? {
		removeLines: true
	} : configuration;

	string = identify_exceptions(string);
	string = identify_common_abbreviations(string); // needs to go before punctuation fixes

	string = (0, _symbolReplacements.replaceSymbols)(string);
	string = replace_periods_with_ellipsis(string);
	string = remove_multiple_spaces(string);

	string = correct_double_quotes_and_primes(string, language);
	string = correct_single_quotes_primes_and_apostrophes(string, language);

	string = correct_multiple_sign(string);

	string = remove_space_before_punctuation(string);
	string = remove_space_after_punctuation(string);
	string = remove_trailing_spaces(string);
	string = add_space_before_punctuation(string);
	string = add_space_after_punctuation(string);
	string = remove_spaces_at_paragraph_beginning(string);

	if (configuration.removeLines) {
		string = (0, _emptyLines.removeEmptyLines)(string);
	}

	string = consolidate_nbsp(string);
	string = correct_spaces_around_ellipsis(string);

	string = replace_hyphen_with_dash(string, language);
	string = replace_dash_with_hyphen(string);

	string = correct_accidental_uppercase(string);

	string = place_common_abbreviations(string); // needs to go after punctuation fixes
	string = place_exceptions(string);

	string = replace_periods_with_ellipsis(string);

	return string;
}

},{"./lib/constants":1,"./lib/empty-lines":2,"./lib/symbol-replacements":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGxpYlxcY29uc3RhbnRzLmpzIiwic3JjXFxsaWJcXGVtcHR5LWxpbmVzLmpzIiwic3JjXFxsaWJcXHN5bWJvbC1yZXBsYWNlbWVudHMuanMiLCJzcmNcXHR5cG9wby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUE7Ozs7QUFLQSxJQUFNLG9CQUFvQiw4REFBMUI7QUFDQSxJQUFNLG9CQUFvQiw4REFBMUI7QUFDQSxJQUFNLGdCQUFnQixvQkFBb0IsaUJBQTFDO0FBQ0EsSUFBTSxpQkFBaUIsUUFBUSxpQkFBL0I7QUFDQSxJQUFNLGlCQUFpQixRQUFRLGlCQUEvQjtBQUNBLElBQU0sV0FBVyxpQkFBaUIsY0FBbEM7QUFDQTs7Ozs7Ozs7OztBQVVBLElBQU0sb0JBQW9CLG1CQUExQjtBQUNBLElBQU0sb0JBQW9CLDBEQUExQjtBQUNBLElBQU0sUUFBUSxHQUFkO0FBQ0EsSUFBTSxPQUFPLEdBQWI7QUFDQSxJQUFNLFlBQVksR0FBbEIsQyxDQUF1QjtBQUN2QixJQUFNLGFBQWEsR0FBbkIsQyxDQUF3QjtBQUN4QixJQUFNLFNBQVMsUUFBUSxJQUFSLEdBQWUsU0FBZixHQUEyQixVQUExQztBQUNBLElBQU0sc0JBQXNCLFFBQTVCO0FBQ0EsSUFBTSxzQkFBc0IsV0FBVyxtQkFBdkMsQyxDQUE0RDtBQUM1RCxJQUFNLGtCQUFrQixXQUF4QjtBQUNBLElBQU0sa0JBQWtCLFdBQXhCO0FBQ0EsSUFBTSxXQUFXLEdBQWpCO0FBQ0EsSUFBTSxTQUFTLEdBQWY7O0FBRUE7Ozs7QUFJQSxJQUFNLGdCQUFnQiwrRkFDcEIsMkVBRG9CLEdBRXBCLDZFQUZvQixHQUdwQiw2Q0FIb0IsR0FHNkI7QUFDakQsS0FKb0IsR0FJWjtBQUNSLDBDQUxvQixHQU1wQixpQ0FOb0IsR0FPcEIseUNBUG9CLEdBUXBCLFlBUm9CLEdBU3BCLHFCQVRvQixHQVVwQixZQVZvQixHQVdwQixpQ0FYb0IsR0FZcEIsWUFab0IsR0FhcEIsNkJBYm9CLEdBY3BCLG1CQWRvQixHQWVwQixnQkFmb0IsR0FnQnBCLGlCQWhCb0IsR0FpQnBCLCtDQWpCb0IsR0FrQnBCLCtCQWxCb0IsR0FtQnBCLGFBbkJvQixHQW9CcEIsNEJBcEJvQixHQXFCcEIsS0FyQm9CLEdBc0JwQixVQXRCb0IsR0F1QnBCLDBCQXZCb0IsR0F3QnBCLHNDQXhCb0IsR0F5QnBCLGFBekJvQixHQTBCcEIsYUExQm9CLEdBMkJwQixRQTNCb0IsR0E0QnBCLFNBNUJvQixHQTZCcEIsV0E3Qm9CLEdBOEJwQix1QkE5Qm9CLEdBOEJNO0FBQzFCLGdFQS9Cb0IsR0FnQ3BCLG1FQWhDb0IsR0FpQ3BCLHFFQWpDb0IsR0FrQ3BCLHNCQWxDb0IsR0FtQ3BCLG1CQW5Db0IsR0FtQ0U7QUFDdEIsaURBcENvQixHQW9DZ0M7QUFDcEQsNERBckNvQixHQXNDcEIsV0F0Q0YsQyxDQXNDZTtBQUNmO0FBQ0E7OztBQUdBLElBQU0sc0JBQXNCLHNDQUMxQixLQUQwQixHQUUxQixpQ0FGMEIsR0FHMUIsR0FIMEIsR0FJMUIsS0FKMEIsR0FLMUIsaUNBTDBCLEdBTTFCLElBTkY7O2tCQVFlO0FBQ2Isc0NBRGE7QUFFYixzQ0FGYTtBQUdiLDhCQUhhO0FBSWIsZ0NBSmE7QUFLYixnQ0FMYTtBQU1iLG9CQU5hO0FBT2Isc0NBUGE7QUFRYixzQ0FSYTtBQVNiLGNBVGE7QUFVYixZQVZhO0FBV2Isc0JBWGE7QUFZYix3QkFaYTtBQWFiLGdCQWJhO0FBY2IsMENBZGE7QUFlYiwwQ0FmYTtBQWdCYixrQ0FoQmE7QUFpQmIsa0NBakJhO0FBa0JiLG9CQWxCYTtBQW1CYixnQkFuQmE7QUFvQmIsOEJBcEJhO0FBcUJiO0FBckJhLEM7Ozs7Ozs7O1FDcEZDLGdCLEdBQUEsZ0I7QUFOaEI7Ozs7OztBQU1PLFNBQVMsZ0JBQVQsQ0FBMEIsTUFBMUIsRUFBa0M7QUFDeEMsUUFBTyxPQUFPLE9BQVAsQ0FBZSxRQUFmLEVBQXlCLEVBQXpCLENBQVA7QUFDQTs7Ozs7Ozs7UUNLZSxjLEdBQUEsYztBQWJoQixJQUFNLFVBQVU7QUFDZCxhQUFXLEdBREc7QUFFZCxhQUFXLEdBRkc7QUFHZixhQUFXLEdBSEk7QUFJZixhQUFXLEdBSkk7QUFLZCxhQUFXLEdBTEc7QUFNZCxhQUFXLEdBTkc7QUFPZCxjQUFZLEdBUEU7QUFRZCxjQUFZLEdBUkU7QUFTZCxZQUFVLEdBVEk7QUFVZCxZQUFVO0FBVkksQ0FBaEI7O0FBYU8sU0FBUyxjQUFULENBQXdCLE1BQXhCLEVBQWdDO0FBQ3RDLE9BQUssSUFBSSxNQUFULElBQW1CLE9BQW5CLEVBQTRCO0FBQzNCLFFBQU0sS0FBSyxJQUFJLE1BQUosQ0FBVyxNQUFYLEVBQW1CLEdBQW5CLENBQVg7QUFDQSxhQUFTLE9BQU8sT0FBUCxDQUFlLEVBQWYsRUFBbUIsUUFBUSxNQUFSLENBQW5CLENBQVQ7QUFDQTtBQUNELFNBQU8sTUFBUDtBQUNBOzs7Ozs7OztRQzB3QmUsYSxHQUFBLGE7O0FBcHhCaEI7O0FBQ0E7O0FBQ0E7Ozs7OztBQUdBLElBQUksYUFBYSxFQUFqQjs7QUFFQTs7OztBQWhCQTs7Ozs7Ozs7O0FBc0JBLFNBQVMsNkJBQVQsQ0FBdUMsTUFBdkMsRUFBK0M7QUFDOUM7QUFDQSxVQUFTLE9BQU8sT0FBUCxDQUFlLFNBQWYsRUFBMEIsR0FBMUIsQ0FBVDs7QUFFQTtBQUNBLEtBQUksVUFBVSxNQUFNLG9CQUFVLE1BQWhCLEdBQXlCLFVBQXpCLEdBQXNDLG9CQUFVLE1BQWhELEdBQXlELEdBQXZFO0FBQ0EsS0FBSSxLQUFLLElBQUksTUFBSixDQUFXLE9BQVgsRUFBb0IsR0FBcEIsQ0FBVDtBQUNBLFVBQVMsT0FBTyxPQUFQLENBQWUsRUFBZixFQUFtQixLQUFuQixDQUFUOztBQUVBO0FBQ0EsVUFBUyxPQUFPLE9BQVAsQ0FBZSxRQUFmLEVBQXlCLEdBQXpCLENBQVQ7O0FBRUEsUUFBTyxNQUFQO0FBQ0E7O0FBSUQsU0FBUyxzQkFBVCxDQUFnQyxNQUFoQyxFQUF3QztBQUN2QyxRQUFPLE9BQU8sT0FBUCxDQUFlLFFBQWYsRUFBeUIsR0FBekIsQ0FBUDtBQUNBOztBQU9EOzs7O0FBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsU0FBUyxnQ0FBVCxDQUEwQyxNQUExQyxFQUFrRCxRQUFsRCxFQUE0RDs7QUFFM0Q7O0FBRUEsS0FBSSxVQUFVLE9BQU8sb0JBQVUsbUJBQWpCLEdBQXVDLEtBQXZDLEdBQThDLG9CQUFVLGlCQUF4RCxHQUE0RSxLQUE1RSxHQUFvRixvQkFBVSxtQkFBOUYsR0FBb0gsSUFBbEk7QUFDQSxLQUFJLEtBQUssSUFBSSxNQUFKLENBQVcsT0FBWCxFQUFvQixHQUFwQixDQUFUO0FBQ0EsVUFBUyxPQUFPLE9BQVAsQ0FBZSxFQUFmLEVBQW1CLE1BQW5CLENBQVQ7O0FBRUE7QUFDQSxXQUFVLE1BQUssb0JBQVUsaUJBQWYsR0FBbUMsS0FBbkMsR0FBMkMsb0JBQVUsbUJBQXJELEdBQTJFLElBQXJGO0FBQ0EsTUFBSyxJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLEdBQXBCLENBQUw7QUFDQSxVQUFTLE9BQU8sT0FBUCxDQUFlLEVBQWYsRUFBbUIsTUFBbkIsQ0FBVDs7QUFFQTs7O0FBR0EsVUFBUyxPQUFPLE9BQVAsQ0FBZSwyQ0FBZixFQUE0RCw0QkFBNUQsQ0FBVDs7QUFHQTtBQUNBLFdBQVUsTUFBTSxvQkFBVSxpQkFBaEIsR0FBb0MsU0FBcEMsR0FBZ0Qsb0JBQVUsaUJBQTFELEdBQThFLEdBQXhGO0FBQ0EsTUFBSyxJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLEdBQXBCLENBQUw7QUFDQSxVQUFTLE9BQU8sT0FBUCxDQUFlLEVBQWYsRUFBbUIsK0RBQW5CLENBQVQ7O0FBR0E7QUFDQSxXQUFVLE1BQU0sb0JBQVUsaUJBQWhCLEdBQW9DLEtBQXBDLEdBQTRDLG9CQUFVLGNBQXRELEdBQXVFLG9CQUFVLGNBQWpGLEdBQWtHLElBQTVHO0FBQ0EsTUFBSyxJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLEdBQXBCLENBQUw7QUFDQSxVQUFTLE9BQU8sT0FBUCxDQUFlLEVBQWYsRUFBbUIsaUNBQW5CLENBQVQ7O0FBR0E7QUFDQSxXQUFVLE9BQU8sb0JBQVUsY0FBakIsR0FBa0Msb0JBQVUsY0FBNUMsR0FBNkQsb0JBQVUsbUJBQXZFLEdBQTZGLG9CQUFVLFFBQXZHLEdBQWtILEtBQWxILEdBQTBILG9CQUFVLGlCQUFwSSxHQUF3SixHQUFsSztBQUNBLE1BQUssSUFBSSxNQUFKLENBQVcsT0FBWCxFQUFvQixHQUFwQixDQUFMO0FBQ0EsVUFBUyxPQUFPLE9BQVAsQ0FBZSxFQUFmLEVBQW1CLGtDQUFuQixDQUFUOztBQUdBO0FBQ0EsV0FBVSxPQUFPLG9CQUFVLE1BQWpCLEdBQTBCLEtBQTFCLEdBQWtDLG9CQUFVLGlCQUE1QyxHQUFnRSxLQUFoRSxHQUF3RSxvQkFBVSxNQUFsRixHQUEyRixJQUFyRztBQUNBLE1BQUssSUFBSSxNQUFKLENBQVcsT0FBWCxFQUFvQixHQUFwQixDQUFMO0FBQ0EsVUFBUyxPQUFPLE9BQVAsQ0FBZSxFQUFmLEVBQW1CLE1BQW5CLENBQVQ7O0FBR0E7QUFDQSxVQUFTLE9BQU8sT0FBUCxDQUFlLHFDQUFmLEVBQXNELElBQXRELENBQVQ7QUFDQSxVQUFTLE9BQU8sT0FBUCxDQUFlLHNDQUFmLEVBQXVELElBQXZELENBQVQ7QUFDQSxVQUFTLE9BQU8sT0FBUCxDQUFlLGdDQUFmLEVBQWlELElBQWpELENBQVQ7O0FBR0E7Ozs7Ozs7Ozs7Ozs7QUFlQSxXQUFVLFFBQVEsb0JBQVUsbUJBQWxCLEdBQXdDLElBQXhDLEdBQStDLG9CQUFVLE1BQXpELEdBQWtFLHNDQUFsRSxHQUEyRyxvQkFBVSxtQkFBckgsR0FBMkksb0NBQXJKO0FBQ0E7QUFDQSxNQUFLLElBQUksTUFBSixDQUFXLE9BQVgsRUFBb0IsR0FBcEIsQ0FBTDtBQUNBLFVBQVMsT0FBTyxPQUFQLENBQWUsRUFBZixFQUFtQixRQUFuQixDQUFUOztBQUdBOztBQUVBLFdBQVUsT0FBTyxvQkFBVSxtQkFBakIsR0FBdUMsVUFBakQ7QUFDQSxNQUFLLElBQUksTUFBSixDQUFXLE9BQVgsRUFBb0IsR0FBcEIsQ0FBTDtBQUNBLFVBQVMsT0FBTyxPQUFQLENBQWUsRUFBZixFQUFtQixJQUFuQixDQUFUOztBQUdBO0FBQ0EsVUFBUyxPQUFPLE9BQVAsQ0FBZSw2QkFBZixFQUE4QyxHQUE5QyxDQUFUOztBQUVBLFNBQVEsUUFBUjtBQUNDLE9BQUssS0FBTDtBQUNDLFlBQVMsT0FBTyxPQUFQLENBQWUsa0NBQWYsRUFBbUQsR0FBbkQsQ0FBVDtBQUNBLFlBQVMsT0FBTyxPQUFQLENBQWUsbUNBQWYsRUFBb0QsR0FBcEQsQ0FBVDtBQUNBO0FBQ0QsT0FBSyxJQUFMO0FBQ0EsT0FBSyxJQUFMO0FBQ0MsWUFBUyxPQUFPLE9BQVAsQ0FBZSxrQ0FBZixFQUFtRCxHQUFuRCxDQUFUO0FBQ0EsWUFBUyxPQUFPLE9BQVAsQ0FBZSxtQ0FBZixFQUFvRCxHQUFwRCxDQUFUO0FBQ0E7QUFDRCxPQUFLLElBQUw7QUFDQyxZQUFTLE9BQU8sT0FBUCxDQUFlLGtDQUFmLEVBQW1ELEdBQW5ELENBQVQ7QUFDQSxZQUFTLE9BQU8sT0FBUCxDQUFlLG1DQUFmLEVBQW9ELEdBQXBELENBQVQ7QUFDQTtBQWJGOztBQWdCQSxRQUFPLE1BQVA7QUFDQTs7QUFJRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxTQUFTLDRDQUFULENBQXNELE1BQXRELEVBQThELFFBQTlELEVBQXdFOztBQUV2RTtBQUNBLEtBQUksVUFBVSxNQUFNLG9CQUFVLGlCQUFoQixHQUFvQyxPQUFwQyxHQUE4QyxvQkFBVSxpQkFBeEQsR0FBNEUsR0FBMUY7QUFDQSxLQUFJLEtBQUssSUFBSSxNQUFKLENBQVcsT0FBWCxFQUFvQixJQUFwQixDQUFUO0FBQ0EsVUFBUyxPQUFPLE9BQVAsQ0FBZSxFQUFmLEVBQW1CLGdEQUFuQixDQUFUOztBQUdBOztBQUVBLEtBQUksdUJBQXVCLDZCQUEzQjtBQUNBLFdBQVUsTUFBTSxvQkFBVSxpQkFBaEIsR0FBb0MsSUFBcEMsR0FBMkMsb0JBQTNDLEdBQWtFLEdBQTVFO0FBQ0EsTUFBSyxJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLElBQXBCLENBQUw7QUFDQSxVQUFTLE9BQU8sT0FBUCxDQUFlLEVBQWYsRUFBbUIsMEJBQW5CLENBQVQ7O0FBR0E7O0FBRUEsS0FBSSxtQkFBbUIsUUFBUSxvQkFBVSxjQUFsQixHQUFtQyxvQkFBVSxjQUFwRTtBQUNBLFdBQVUsT0FBTSxnQkFBTixHQUF3QixLQUF4QixHQUFnQyxvQkFBVSxpQkFBMUMsR0FBOEQsS0FBOUQsR0FBcUUsZ0JBQXJFLEdBQXVGLElBQWpHO0FBQ0EsTUFBSyxJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLEdBQXBCLENBQUw7QUFDQSxVQUFTLE9BQU8sT0FBUCxDQUFlLEVBQWYsRUFBbUIsNEJBQW5CLENBQVQ7O0FBR0E7O0FBRUEsV0FBVSxNQUFNLG9CQUFVLGlCQUFoQixHQUFvQyxhQUE5QztBQUNBLE1BQUssSUFBSSxNQUFKLENBQVcsT0FBWCxFQUFvQixHQUFwQixDQUFMO0FBQ0EsVUFBUyxPQUFPLE9BQVAsQ0FBZSxFQUFmLEVBQW1CLDBCQUFuQixDQUFUOztBQUdBO0FBQ0EsV0FBVSxNQUFNLG9CQUFVLGlCQUFoQixHQUFvQyxTQUFwQyxHQUFnRCxvQkFBVSxpQkFBMUQsR0FBOEUsR0FBeEY7QUFDQSxNQUFLLElBQUksTUFBSixDQUFXLE9BQVgsRUFBb0IsR0FBcEIsQ0FBTDtBQUNBLFVBQVMsT0FBTyxPQUFQLENBQWUsRUFBZixFQUFtQixVQUFTLEVBQVQsRUFBYSxFQUFiLEVBQWlCLEVBQWpCLEVBQXFCLEVBQXJCLEVBQXdCOztBQUVuRDtBQUNBLE1BQUksVUFBVSxTQUFTLG9CQUFVLGlCQUFuQixHQUF1QyxLQUF2QyxHQUE4QyxvQkFBVSxjQUF4RCxHQUF5RSxvQkFBVSxjQUFuRixHQUFtRyxJQUFqSDtBQUNBLE1BQUksS0FBSyxJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLEdBQXBCLENBQVQ7QUFDQSxPQUFLLEdBQUcsT0FBSCxDQUFXLEVBQVgsRUFBZSwwQ0FBZixDQUFMOztBQUVBO0FBQ0EsWUFBVSxPQUFNLG9CQUFVLGNBQWhCLEdBQWlDLG9CQUFVLGNBQTNDLEdBQTJELGVBQTNELEdBQTZFLG9CQUFVLGlCQUF2RixHQUEyRyxnQkFBckg7QUFDQSxPQUFLLElBQUksTUFBSixDQUFXLE9BQVgsRUFBb0IsR0FBcEIsQ0FBTDtBQUNBLE9BQUssR0FBRyxPQUFILENBQVcsRUFBWCxFQUFlLDZDQUFmLENBQUw7O0FBRUE7QUFDQSxZQUFVLG9GQUFWO0FBQ0EsT0FBSyxJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLEdBQXBCLENBQUw7QUFDQSxPQUFLLEdBQUcsT0FBSCxDQUFXLEVBQVgsRUFBZSwrREFBZixDQUFMOztBQUVBLFNBQU8sS0FBSyxFQUFMLEdBQVUsRUFBakI7QUFDQSxFQWxCUSxDQUFUOztBQXFCQTs7O0FBR0EsVUFBUyxPQUFPLE9BQVAsQ0FBZSxzQkFBZixFQUF1Qyw0QkFBdkMsQ0FBVDs7QUFHQTtBQUNBLFdBQVUsTUFBTSxvQkFBVSxpQkFBaEIsR0FBb0MsR0FBOUM7QUFDQSxNQUFLLElBQUksTUFBSixDQUFXLE9BQVgsRUFBb0IsR0FBcEIsQ0FBTDtBQUNBLFVBQVMsT0FBTyxPQUFQLENBQWUsRUFBZixFQUFtQix3QkFBbkIsQ0FBVDs7QUFJQTtBQUNBLFVBQVMsT0FBTyxPQUFQLENBQWUsNkJBQWYsRUFBOEMsR0FBOUMsQ0FBVDtBQUNBLFVBQVMsT0FBTyxPQUFQLENBQWUsb0dBQWYsRUFBcUgsR0FBckgsQ0FBVDs7QUFHQSxTQUFRLFFBQVI7QUFDQSxPQUFLLEtBQUw7QUFDQyxZQUFTLE9BQU8sT0FBUCxDQUFlLGdDQUFmLEVBQWlELEdBQWpELENBQVQ7QUFDQSxZQUFTLE9BQU8sT0FBUCxDQUFlLGlDQUFmLEVBQWtELEdBQWxELENBQVQ7QUFDQTtBQUNELE9BQUssSUFBTDtBQUNBLE9BQUssSUFBTDtBQUNDLFlBQVMsT0FBTyxPQUFQLENBQWUsZ0NBQWYsRUFBaUQsR0FBakQsQ0FBVDtBQUNBLFlBQVMsT0FBTyxPQUFQLENBQWUsaUNBQWYsRUFBa0QsR0FBbEQsQ0FBVDtBQUNBO0FBQ0QsT0FBSyxJQUFMO0FBQ0MsWUFBUyxPQUFPLE9BQVAsQ0FBZSxnQ0FBZixFQUFpRCxHQUFqRCxDQUFUO0FBQ0EsWUFBUyxPQUFPLE9BQVAsQ0FBZSxpQ0FBZixFQUFrRCxHQUFsRCxDQUFUO0FBWkQ7O0FBZUEsUUFBTyxNQUFQO0FBQ0E7O0FBSUQsU0FBUyxxQkFBVCxDQUErQixNQUEvQixFQUF1QztBQUN0QyxRQUFPLHVCQUF1QixPQUFPLE9BQVAsQ0FBZSx3RUFBZixFQUF5RixTQUF6RixDQUF2QixDQUFQO0FBQ0E7O0FBSUQ7Ozs7Ozs7Ozs7Ozs7QUFhQSxTQUFTLHdCQUFULENBQWtDLE1BQWxDLEVBQTBDLFFBQTFDLEVBQW9EO0FBQ25ELEtBQUksU0FBUyxLQUFiLENBRG1ELENBQy9COztBQUVwQjtBQUNBLFVBQVMsT0FBTyxPQUFQLENBQWUsUUFBZixFQUF5QixHQUF6QixDQUFUOztBQUdBO0FBQ0EsVUFBUyxPQUFPLE9BQVAsQ0FBZSxPQUFmLEVBQXdCLEdBQXhCLENBQVQ7O0FBR0E7QUFDQSxLQUFJLFVBQVUsTUFBTSxvQkFBVSxNQUFoQixHQUF5QixJQUF6QixHQUFnQyxNQUFoQyxHQUF5QyxJQUF6QyxHQUFnRCxvQkFBVSxNQUExRCxHQUFtRSxHQUFqRjtBQUNBLEtBQUksS0FBSyxJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLEdBQXBCLENBQVQ7QUFDQSxLQUFJLGNBQWMsb0JBQVUsVUFBVixHQUF1QixHQUF2QixHQUE2QixvQkFBVSxTQUF6RDtBQUNBLFVBQVMsT0FBTyxPQUFQLENBQWUsRUFBZixFQUFtQixXQUFuQixDQUFUOztBQUVBOzs7QUFHQSxLQUFJLGtCQUFrQixNQUF0QjtBQUNBLFdBQVUsTUFBTSxlQUFOLEdBQXdCLEtBQXhCLEdBQWdDLG9CQUFVLE1BQTFDLEdBQW1ELEtBQW5ELEdBQTJELE1BQTNELEdBQW9FLElBQXBFLEdBQTJFLG9CQUFVLE1BQXJGLEdBQThGLE1BQTlGLEdBQXVHLGVBQXZHLEdBQXlILEdBQW5JO0FBQ0EsTUFBSyxJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLEdBQXBCLENBQUw7QUFDQSxVQUFTLE9BQU8sT0FBUCxDQUFlLEVBQWYsRUFBbUIsT0FBbkIsQ0FBVDs7QUFHQTs7O0FBR0EsS0FBSSxvQkFBb0IsRUFBeEI7QUFDQSxTQUFRLFFBQVI7QUFDQyxPQUFLLEtBQUw7QUFDQSxPQUFLLElBQUw7QUFDQSxPQUFLLElBQUw7QUFDQyx1QkFBb0IsS0FBcEI7QUFDQTtBQUNELE9BQUssSUFBTDtBQUNDLHVCQUFvQixhQUFwQjtBQUNBO0FBUkY7QUFVQSxXQUFVLE1BQU0sZUFBTixHQUF3QixJQUF4QixHQUErQixpQkFBL0IsR0FBbUQsS0FBbkQsR0FBMkQsb0JBQVUsTUFBckUsR0FBOEUsS0FBOUUsR0FBc0YsTUFBdEYsR0FBK0YsSUFBL0YsR0FBc0csb0JBQVUsTUFBaEgsR0FBeUgsTUFBekgsR0FBa0ksZUFBbEksR0FBb0osSUFBcEosR0FBMkosaUJBQTNKLEdBQStLLEdBQXpMO0FBQ0EsTUFBSyxJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLElBQXBCLENBQUw7QUFDQSxVQUFTLE9BQU8sT0FBUCxDQUFlLEVBQWYsRUFBbUIsV0FBbkIsQ0FBVDs7QUFFQSxRQUFPLE1BQVA7QUFDQTs7QUFJRCxTQUFTLHdCQUFULENBQWtDLE1BQWxDLEVBQXlDO0FBQ3hDLEtBQUksVUFBVSxPQUFNLG9CQUFVLGNBQWhCLEdBQWdDLFlBQWhDLEdBQThDLG9CQUFVLGNBQXhELEdBQXdFLElBQXRGO0FBQ0EsS0FBSSxLQUFLLElBQUksTUFBSixDQUFXLE9BQVgsRUFBb0IsR0FBcEIsQ0FBVDtBQUNBLFFBQU8sT0FBTyxPQUFQLENBQWUsRUFBZixFQUFtQixPQUFuQixDQUFQO0FBQ0E7O0FBT0Q7Ozs7QUFNQSxTQUFTLCtCQUFULENBQXlDLE1BQXpDLEVBQWlEO0FBQ2hELEtBQUksVUFBVSxPQUFPLG9CQUFVLE1BQWpCLEdBQTBCLE1BQTFCLEdBQW1DLG9CQUFVLG1CQUE3QyxHQUFtRSxvQkFBVSxlQUE3RSxHQUErRixvQkFBVSxNQUF6RyxHQUFrSCxJQUFoSTtBQUNBLEtBQUksS0FBSyxJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLEdBQXBCLENBQVQ7QUFDQSxRQUFPLE9BQU8sT0FBUCxDQUFlLEVBQWYsRUFBbUIsSUFBbkIsQ0FBUDtBQUNBOztBQUlELFNBQVMsOEJBQVQsQ0FBd0MsTUFBeEMsRUFBZ0Q7QUFDL0MsS0FBSSxVQUFVLE9BQU8sb0JBQVUsZUFBakIsR0FBbUMsTUFBbkMsR0FBNEMsb0JBQVUsTUFBdEQsR0FBK0QsSUFBN0U7QUFDQSxLQUFJLEtBQUssSUFBSSxNQUFKLENBQVcsT0FBWCxFQUFvQixHQUFwQixDQUFUO0FBQ0EsUUFBTyxPQUFPLE9BQVAsQ0FBZSxFQUFmLEVBQW1CLElBQW5CLENBQVA7QUFDQTs7QUFJRCxTQUFTLHNCQUFULENBQWdDLE1BQWhDLEVBQXdDO0FBQ3ZDLFFBQU8sT0FBTyxJQUFQLEVBQVA7QUFDQTs7QUFJRCxTQUFTLDRCQUFULENBQXNDLE1BQXRDLEVBQThDO0FBQzdDLEtBQUksVUFBVSxPQUFNLG9CQUFVLGNBQWhCLEdBQWlDLG9CQUFVLGNBQTNDLEdBQTRELE1BQTVELEdBQXFFLG9CQUFVLGVBQS9FLEdBQWlHLE1BQWpHLEdBQXlHLG9CQUFVLGNBQW5ILEdBQW9JLG9CQUFVLGNBQTlJLEdBQStKLElBQTdLO0FBQ0EsS0FBSSxLQUFLLElBQUksTUFBSixDQUFXLE9BQVgsRUFBb0IsR0FBcEIsQ0FBVDtBQUNBLFFBQU8sT0FBTyxPQUFQLENBQWUsRUFBZixFQUFtQixTQUFuQixDQUFQO0FBQ0E7O0FBSUQsU0FBUywyQkFBVCxDQUFxQyxNQUFyQyxFQUE2QztBQUM1QyxLQUFJLFVBQVUsT0FBTSxvQkFBVSxjQUFoQixHQUFpQyxvQkFBVSxjQUEzQyxHQUE0RCxNQUE1RCxHQUFxRSxvQkFBVSxtQkFBL0UsR0FBcUcsb0JBQVUsZUFBL0csR0FBaUksTUFBakksR0FBeUksb0JBQVUsY0FBbkosR0FBb0ssb0JBQVUsY0FBOUssR0FBK0wsSUFBN007QUFDQSxLQUFJLEtBQUssSUFBSSxNQUFKLENBQVcsT0FBWCxFQUFvQixHQUFwQixDQUFUO0FBQ0EsUUFBTyxPQUFPLE9BQVAsQ0FBZSxFQUFmLEVBQW1CLFNBQW5CLENBQVA7QUFDQTs7QUFJRDs7Ozs7Ozs7Ozs7Ozs7O0FBZUEsU0FBUyxvQ0FBVCxDQUE4QyxNQUE5QyxFQUFzRDtBQUNyRDtBQUNBLEtBQUksUUFBUSxPQUFPLEtBQVAsQ0FBYSxPQUFiLENBQVo7O0FBRUE7QUFDQSxNQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksTUFBTSxNQUExQixFQUFrQyxHQUFsQyxFQUF1QztBQUN0QyxRQUFNLENBQU4sSUFBVyxNQUFNLENBQU4sRUFBUyxPQUFULENBQWlCLE1BQWpCLEVBQXlCLEVBQXpCLENBQVg7QUFDQTs7QUFFRDtBQUNBLFFBQU8sTUFBTSxJQUFOLENBQVcsSUFBWCxDQUFQO0FBQ0E7O0FBSUQ7Ozs7Ozs7Ozs7O0FBV0EsU0FBUyxnQkFBVCxDQUEwQixNQUExQixFQUFrQzs7QUFFakM7QUFDQSxLQUFJLFVBQVUsT0FBTSxvQkFBVSxjQUFoQixHQUFpQyxvQkFBVSxjQUEzQyxHQUEyRCxVQUEzRCxHQUF1RSxvQkFBVSxJQUFqRixHQUF3RixvQkFBVSxVQUFsRyxHQUE4RyxNQUE5RyxHQUFzSCxvQkFBVSxjQUFoSSxHQUFpSixvQkFBVSxjQUEzSixHQUEySyxRQUF6TDtBQUNBLEtBQUksS0FBSyxJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLEdBQXBCLENBQVQ7QUFDQSxVQUFVLE9BQU8sT0FBUCxDQUFlLEVBQWYsRUFBbUIsT0FBbkIsQ0FBVjtBQUNBLFVBQVUsT0FBTyxPQUFQLENBQWUsRUFBZixFQUFtQixPQUFuQixDQUFWLENBTmlDLENBTU07OztBQUd2QztBQUNBLFdBQVUsa0JBQWlCLG9CQUFVLGNBQTNCLEdBQTRDLG9CQUFVLGNBQXRELEdBQXNFLEtBQWhGO0FBQ0EsTUFBSyxJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLEdBQXBCLENBQUw7QUFDQSxLQUFJLGNBQWMsT0FBTyxvQkFBVSxJQUFqQixHQUF3QixJQUExQztBQUNBLFVBQVUsT0FBTyxPQUFQLENBQWUsRUFBZixFQUFtQixXQUFuQixDQUFWOztBQUdBO0FBQ0EsV0FBVSxPQUFPLG9CQUFVLE1BQWpCLEdBQTBCLFdBQTFCLEdBQXdDLG9CQUFVLE1BQWxELEdBQTJELElBQXJFO0FBQ0EsTUFBSyxJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLEdBQXBCLENBQUw7QUFDQSxlQUFjLG9CQUFVLElBQVYsR0FBaUIsSUFBakIsR0FBd0Isb0JBQVUsSUFBaEQ7QUFDQSxVQUFTLE9BQU8sT0FBUCxDQUFlLEVBQWYsRUFBbUIsV0FBbkIsQ0FBVDs7QUFHQTtBQUNBLFdBQVUsYUFBYSxvQkFBVSxjQUF2QixHQUF3QyxvQkFBVSxjQUFsRCxHQUFtRSxTQUE3RTtBQUNBLE1BQUssSUFBSSxNQUFKLENBQVcsT0FBWCxFQUFvQixHQUFwQixDQUFMO0FBQ0EsZUFBYyxTQUFTLG9CQUFVLElBQWpDO0FBQ0EsVUFBUyxPQUFPLE9BQVAsQ0FBZSxFQUFmLEVBQW1CLFdBQW5CLENBQVQ7QUFDQSxVQUFTLE9BQU8sT0FBUCxDQUFlLEVBQWYsRUFBbUIsV0FBbkIsQ0FBVCxDQTVCaUMsQ0E0QlM7O0FBRTFDLFFBQU8sTUFBUDtBQUNBOztBQUlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxTQUFTLDhCQUFULENBQXdDLE1BQXhDLEVBQWdEOztBQUUvQztBQUNBLEtBQUksVUFBVSxPQUFPLG9CQUFVLE1BQWpCLEdBQTBCLElBQTFCLEdBQWlDLG9CQUFVLFFBQTNDLEdBQXNELEdBQXRELEdBQTRELG9CQUFVLE1BQXRFLEdBQStFLEtBQTdGO0FBQ0EsS0FBSSxLQUFLLElBQUksTUFBSixDQUFXLE9BQVgsRUFBb0IsR0FBcEIsQ0FBVDtBQUNBLFVBQVMsT0FBTyxPQUFQLENBQWUsRUFBZixFQUFtQixNQUFuQixDQUFUOztBQUdBOztBQUVBLFdBQVUsT0FBTyxvQkFBVSxjQUFqQixHQUFrQyxNQUFsQyxHQUEyQyxvQkFBVSxNQUFyRCxHQUE4RCxLQUE5RCxHQUFzRSxvQkFBVSxRQUFoRixHQUEyRixHQUEzRixHQUFpRyxvQkFBVSxNQUEzRyxHQUFvSCxJQUFwSCxHQUEySCxvQkFBVSxjQUFySSxHQUFzSixJQUFoSztBQUNBLE1BQUssSUFBSSxNQUFKLENBQVcsT0FBWCxFQUFvQixHQUFwQixDQUFMO0FBQ0EsVUFBUyxPQUFPLE9BQVAsQ0FBZSxFQUFmLEVBQW1CLE1BQW5CLENBQVQ7O0FBR0E7O0FBRUEsV0FBVSxPQUFPLG9CQUFVLG1CQUFqQixHQUF1QyxJQUF2QyxHQUE4QyxvQkFBVSxNQUF4RCxHQUFpRSxHQUFqRSxHQUF1RSxvQkFBVSxRQUFqRixHQUEyRixLQUEzRixHQUFtRyxvQkFBVSxNQUE3RyxHQUFzSCxNQUF0SCxHQUErSCxvQkFBVSxjQUF6SSxHQUF5SixJQUFuSztBQUNBLE1BQUssSUFBSSxNQUFKLENBQVcsT0FBWCxFQUFvQixHQUFwQixDQUFMO0FBQ0EsVUFBUyxPQUFPLE9BQVAsQ0FBZSxFQUFmLEVBQW1CLE1BQW5CLENBQVQ7O0FBR0E7O0FBRUEsV0FBVSxXQUFXLG9CQUFVLE1BQXJCLEdBQThCLE1BQTlCLEdBQXVDLG9CQUFVLGNBQWpELEdBQWtFLG9CQUFVLGNBQTVFLEdBQTZGLElBQXZHO0FBQ0EsTUFBSyxJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLElBQXBCLENBQUw7QUFDQSxVQUFTLE9BQU8sT0FBUCxDQUFlLEVBQWYsRUFBbUIsTUFBbkIsQ0FBVDs7QUFHQTs7QUFFQSxXQUFVLE9BQU8sb0JBQVUsY0FBakIsR0FBa0Msb0JBQVUsbUJBQTVDLEdBQWtFLE1BQWxFLEdBQTJFLG9CQUFVLE1BQXJGLEdBQThGLEtBQTlGLEdBQXNHLG9CQUFVLFFBQWhILEdBQTJILFFBQTNILEdBQXNJLG9CQUFVLG1CQUFoSixHQUFzSyxvQkFBVSxjQUFoTCxHQUFpTSxvQkFBVSxjQUEzTSxHQUE0TixJQUF0TztBQUNBLE1BQUssSUFBSSxNQUFKLENBQVcsT0FBWCxFQUFvQixHQUFwQixDQUFMO0FBQ0EsVUFBUyxPQUFPLE9BQVAsQ0FBZSxFQUFmLEVBQW1CLE1BQW5CLENBQVQ7O0FBRUEsUUFBTyxNQUFQO0FBQ0E7O0FBSUQ7Ozs7Ozs7Ozs7Ozs7O0FBY0EsU0FBUyw0QkFBVCxDQUFzQyxNQUF0QyxFQUE4Qzs7QUFFN0M7QUFDQSxLQUFJLFVBQVUsTUFBSyxvQkFBVSxjQUFmLEdBQStCLFNBQS9CLEdBQTBDLG9CQUFVLGNBQXBELEdBQW9FLElBQWxGO0FBQ0EsS0FBSSxLQUFLLElBQUksTUFBSixDQUFXLE9BQVgsRUFBb0IsR0FBcEIsQ0FBVDtBQUNBLFVBQVMsT0FBTyxPQUFQLENBQWUsRUFBZixFQUFtQixVQUFTLE1BQVQsRUFBZ0I7QUFDM0MsU0FBUSxPQUFPLFNBQVAsQ0FBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsSUFBd0IsT0FBTyxTQUFQLENBQWlCLENBQWpCLEVBQW9CLFdBQXBCLEVBQWhDO0FBQ0EsRUFGUSxDQUFUOztBQUlBOzs7O0FBSUEsV0FBVSxNQUFLLG9CQUFVLGNBQWYsR0FBK0IsSUFBL0IsR0FBcUMsb0JBQVUsY0FBL0MsR0FBK0QsTUFBekU7QUFDQSxNQUFLLElBQUksTUFBSixDQUFXLE9BQVgsRUFBb0IsR0FBcEIsQ0FBTDtBQUNBLFVBQVMsT0FBTyxPQUFQLENBQWUsRUFBZixFQUFtQixVQUFTLE1BQVQsRUFBZ0I7QUFDM0MsU0FBUSxPQUFPLFNBQVAsQ0FBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsSUFBd0IsT0FBTyxTQUFQLENBQWlCLENBQWpCLEVBQW9CLFdBQXBCLEVBQWhDO0FBQ0EsRUFGUSxDQUFUOztBQUlBO0FBQ0EsV0FBVSxNQUFLLG9CQUFVLGNBQWYsR0FBK0IsS0FBL0IsR0FBc0Msb0JBQVUsY0FBaEQsR0FBZ0UsT0FBMUU7QUFDQSxNQUFLLElBQUksTUFBSixDQUFXLE9BQVgsRUFBb0IsR0FBcEIsQ0FBTDtBQUNBLFVBQVMsT0FBTyxPQUFQLENBQWUsRUFBZixFQUFtQixVQUFTLE1BQVQsRUFBZ0I7QUFDM0MsU0FBUSxPQUFPLFNBQVAsQ0FBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsSUFBd0IsT0FBTyxTQUFQLENBQWlCLENBQWpCLEVBQW9CLFdBQXBCLEVBQWhDO0FBQ0EsRUFGUSxDQUFUOztBQUlBLFFBQU8sTUFBUDtBQUNBOztBQU9EOzs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxTQUFTLDZCQUFULENBQXVDLE1BQXZDLEVBQStDOztBQUU5QztBQUNBLEtBQUksZ0JBQWdCLENBQUMsSUFBRCxFQUFPLElBQVAsQ0FBcEI7QUFDQSxNQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksY0FBYyxNQUFsQyxFQUEwQyxHQUExQyxFQUErQztBQUM5QyxNQUFJLFVBQVUsVUFBVSxjQUFjLENBQWQsRUFBaUIsQ0FBakIsQ0FBVixHQUFnQyxRQUFoQyxHQUEwQyxvQkFBVSxNQUFwRCxHQUE0RCxLQUE1RCxHQUFvRSxjQUFjLENBQWQsRUFBaUIsQ0FBakIsQ0FBcEUsR0FBMEYsVUFBMUYsR0FBc0csb0JBQVUsTUFBaEgsR0FBd0gsVUFBdEk7QUFDQTtBQUNBLE1BQUksS0FBSyxJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLElBQXBCLENBQVQ7QUFDQSxNQUFJLGNBQWMsZUFBZSxjQUFjLENBQWQsQ0FBZixHQUFrQyxLQUFwRDtBQUNBLFdBQVMsT0FBTyxPQUFQLENBQWUsRUFBZixFQUFtQixXQUFuQixDQUFUO0FBQ0E7O0FBS0Q7QUFDQSxpQkFBZ0IsQ0FBQyxJQUFELEVBQU8sSUFBUCxDQUFoQjtBQUNBLE1BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxjQUFjLE1BQWxDLEVBQTBDLEdBQTFDLEVBQStDO0FBQzlDLE1BQUksVUFBVSxZQUFZLG9CQUFVLE1BQXRCLEdBQStCLFVBQS9CLEdBQTRDLGNBQWMsQ0FBZCxFQUFpQixDQUFqQixDQUE1QyxHQUFrRSxRQUFsRSxHQUE0RSxvQkFBVSxNQUF0RixHQUE4RixLQUE5RixHQUFzRyxjQUFjLENBQWQsRUFBaUIsQ0FBakIsQ0FBdEcsR0FBNEgsVUFBNUgsR0FBd0ksb0JBQVUsTUFBbEosR0FBMEosY0FBeEs7QUFDQSxNQUFJLEtBQUssSUFBSSxNQUFKLENBQVcsT0FBWCxFQUFvQixJQUFwQixDQUFUO0FBQ0EsZ0JBQWMsa0JBQWtCLGNBQWMsQ0FBZCxDQUFsQixHQUFxQyxLQUFuRDtBQUNBLFdBQVMsT0FBTyxPQUFQLENBQWUsRUFBZixFQUFtQixXQUFuQixDQUFUO0FBQ0E7O0FBR0Q7Ozs7QUFJQSxpQkFBZ0IsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsRUFBbUIsSUFBbkIsQ0FBaEI7QUFDQSxNQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksY0FBYyxNQUFsQyxFQUEwQyxHQUExQyxFQUErQztBQUM5QztBQUNBLE1BQUksVUFBVSxPQUFPLG9CQUFVLGFBQWpCLEdBQWlDLGVBQWpDLEdBQW1ELGNBQWMsQ0FBZCxDQUFuRCxHQUFzRSxLQUFwRjtBQUNBLE1BQUksS0FBSyxJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLEdBQXBCLENBQVQ7QUFDQSxnQkFBYyxPQUFPLGNBQWMsQ0FBZCxDQUFyQjtBQUNBLFdBQVMsT0FBTyxPQUFQLENBQWUsRUFBZixFQUFtQixXQUFuQixDQUFUOztBQUVBO0FBQ0EsWUFBVSxnQkFBZ0IsY0FBYyxDQUFkLENBQWhCLEdBQW1DLFFBQW5DLEdBQThDLG9CQUFVLGFBQXhELEdBQXdFLElBQWxGO0FBQ0EsT0FBSyxJQUFJLE1BQUosQ0FBVyxPQUFYLEVBQW9CLEdBQXBCLENBQUw7QUFDQSxnQkFBYyxjQUFjLENBQWQsSUFBbUIsSUFBakM7QUFDQSxXQUFTLE9BQU8sT0FBUCxDQUFlLEVBQWYsRUFBbUIsV0FBbkIsQ0FBVDtBQUNBOztBQUVELFFBQU8sTUFBUDtBQUNBOztBQUlEOzs7Ozs7O0FBT0EsU0FBUywwQkFBVCxDQUFvQyxNQUFwQyxFQUE0QztBQUMzQyxLQUFJLGdCQUFnQixDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsSUFBYixFQUFtQixJQUFuQixDQUFwQjtBQUNBLE1BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxjQUFjLE1BQWxDLEVBQTBDLEdBQTFDLEVBQStDO0FBQzlDLE1BQUksVUFBVSxlQUFlLGNBQWMsQ0FBZCxDQUFmLEdBQWtDLElBQWhEO0FBQ0EsTUFBSSxLQUFLLElBQUksTUFBSixDQUFXLE9BQVgsRUFBb0IsR0FBcEIsQ0FBVDtBQUNBLE1BQUksY0FBYyxjQUFjLENBQWQsRUFBaUIsQ0FBakIsSUFBc0IsR0FBdEIsR0FBNEIsY0FBYyxDQUFkLEVBQWlCLENBQWpCLENBQTVCLEdBQWtELEdBQXBFO0FBQ0EsV0FBUyxPQUFPLE9BQVAsQ0FBZSxFQUFmLEVBQW1CLFdBQW5CLENBQVQ7QUFDQTs7QUFFRCxRQUFPLE1BQVA7QUFDQTs7QUFRRDs7OztBQUtBOzs7Ozs7Ozs7OztBQVdBLFNBQVMsbUJBQVQsQ0FBNkIsTUFBN0IsRUFBcUM7O0FBRXBDO0FBQ0Esd0JBQXVCLE1BQXZCLEVBQStCLG9CQUFVLG1CQUF6Qzs7QUFHQTtBQUNBLHdCQUF1QixNQUF2QixFQUErQixvQkFBVSxhQUF6Qzs7QUFHQTtBQUNBLE1BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxXQUFXLE1BQS9CLEVBQXVDLEdBQXZDLEVBQTRDO0FBQzNDLE1BQUksY0FBYyx5QkFBeUIsQ0FBekIsR0FBNkIsSUFBL0M7QUFDQSxXQUFTLE9BQU8sT0FBUCxDQUFlLFdBQVcsQ0FBWCxDQUFmLEVBQThCLFdBQTlCLENBQVQ7QUFDQTs7QUFFRCxRQUFPLE1BQVA7QUFDQTs7QUFJRDs7Ozs7OztBQU9BLFNBQVMsc0JBQVQsQ0FBZ0MsTUFBaEMsRUFBd0MsT0FBeEMsRUFBaUQ7QUFDaEQsS0FBSSxLQUFLLElBQUksTUFBSixDQUFXLE9BQVgsRUFBb0IsR0FBcEIsQ0FBVDtBQUNBLEtBQUkscUJBQXFCLE9BQU8sS0FBUCxDQUFhLEVBQWIsQ0FBekI7QUFDQSxLQUFJLHNCQUFzQixJQUExQixFQUFnQztBQUMvQixlQUFhLFdBQVcsTUFBWCxDQUFrQixrQkFBbEIsQ0FBYjtBQUNBO0FBQ0Q7O0FBSUQ7Ozs7Ozs7O0FBUUEsU0FBUyxnQkFBVCxDQUEwQixNQUExQixFQUFrQztBQUNqQyxNQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksV0FBVyxNQUEvQixFQUF1QyxHQUF2QyxFQUE0QztBQUMzQyxNQUFJLFVBQVUseUJBQXlCLENBQXpCLEdBQTZCLElBQTNDO0FBQ0EsTUFBSSxLQUFLLElBQUksTUFBSixDQUFXLE9BQVgsRUFBb0IsR0FBcEIsQ0FBVDtBQUNBLE1BQUksY0FBYyxXQUFXLENBQVgsQ0FBbEI7QUFDQSxXQUFTLE9BQU8sT0FBUCxDQUFlLEVBQWYsRUFBbUIsV0FBbkIsQ0FBVDtBQUNBOztBQUVELFFBQU8sTUFBUDtBQUNBOztBQU9EOzs7O0FBTUE7Ozs7Ozs7OztBQVNPLFNBQVMsYUFBVCxDQUF1QixNQUF2QixFQUErQixRQUEvQixFQUF5QyxhQUF6QyxFQUF3RDtBQUM5RCxZQUFZLE9BQU8sUUFBUCxLQUFvQixXQUFyQixHQUFvQyxJQUFwQyxHQUEyQyxRQUF0RDs7QUFFQSxpQkFBaUIsT0FBTyxhQUFQLEtBQXlCLFdBQTFCLEdBQXlDO0FBQ3hELGVBQWM7QUFEMEMsRUFBekMsR0FFWixhQUZKOztBQUlBLFVBQVMsb0JBQW9CLE1BQXBCLENBQVQ7QUFDQSxVQUFTLDhCQUE4QixNQUE5QixDQUFULENBUjhELENBUWQ7O0FBRWhELFVBQVMsd0NBQWUsTUFBZixDQUFUO0FBQ0EsVUFBUyw4QkFBOEIsTUFBOUIsQ0FBVDtBQUNBLFVBQVMsdUJBQXVCLE1BQXZCLENBQVQ7O0FBR0EsVUFBUyxpQ0FBaUMsTUFBakMsRUFBeUMsUUFBekMsQ0FBVDtBQUNBLFVBQVMsNkNBQTZDLE1BQTdDLEVBQXFELFFBQXJELENBQVQ7O0FBRUEsVUFBUyxzQkFBc0IsTUFBdEIsQ0FBVDs7QUFFQSxVQUFTLGdDQUFnQyxNQUFoQyxDQUFUO0FBQ0EsVUFBUywrQkFBK0IsTUFBL0IsQ0FBVDtBQUNBLFVBQVMsdUJBQXVCLE1BQXZCLENBQVQ7QUFDQSxVQUFTLDZCQUE2QixNQUE3QixDQUFUO0FBQ0EsVUFBUyw0QkFBNEIsTUFBNUIsQ0FBVDtBQUNBLFVBQVMscUNBQXFDLE1BQXJDLENBQVQ7O0FBRUEsS0FBRyxjQUFjLFdBQWpCLEVBQThCO0FBQzdCLFdBQVMsa0NBQWlCLE1BQWpCLENBQVQ7QUFDQTs7QUFFRCxVQUFTLGlCQUFpQixNQUFqQixDQUFUO0FBQ0EsVUFBUywrQkFBK0IsTUFBL0IsQ0FBVDs7QUFFQSxVQUFTLHlCQUF5QixNQUF6QixFQUFpQyxRQUFqQyxDQUFUO0FBQ0EsVUFBUyx5QkFBeUIsTUFBekIsQ0FBVDs7QUFFQSxVQUFTLDZCQUE2QixNQUE3QixDQUFUOztBQUVBLFVBQVMsMkJBQTJCLE1BQTNCLENBQVQsQ0F2QzhELENBdUNqQjtBQUM3QyxVQUFTLGlCQUFpQixNQUFqQixDQUFUOztBQUVBLFVBQVMsOEJBQThCLE1BQTlCLENBQVQ7O0FBRUEsUUFBTyxNQUFQO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKlxcXG4gVmFyaWFibGVzICYgQ2hhcmFjdGVyIHJlcGxhY2VtZW50IHNldHNcblxcKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cbmNvbnN0IG5vbkxhdGluTG93ZXJjYXNlID0gXCLDocOkxI3Ej8OpxJvDrcS6xL7FiMOzw7TDtsWRxZXFmcWhxaXDusO8xbHFr8O9xb7QsNCx0LLQs9KR0LTQtdC30ZbQuNC50LrQu9C80L3QvtC/0YDRgdGC0YPRhNGK0YvRjNGG0YfQttGI0ZfRidGR0ZTRjtGP0YVcIjtcbmNvbnN0IG5vbkxhdGluVXBwZXJjYXNlID0gXCLDgcOExIzEjsOJxJrDjcS5xL3Fh8OTw5TDlsWQxZTFmMWgxaTDmsOcxbDFrsOdxb3QkNCR0JLQk9KQ0JTQldCX0IbQmNCZ0JrQm9Cc0J3QntCf0KDQodCi0KPQpNCq0KvQrNCm0KfQltCo0IfQqdCB0ITQrtCv0KVcIjtcbmNvbnN0IG5vbkxhdGluQ2hhcnMgPSBub25MYXRpbkxvd2VyY2FzZSArIG5vbkxhdGluVXBwZXJjYXNlO1xuY29uc3QgbG93ZXJjYXNlQ2hhcnMgPSBcImEtelwiICsgbm9uTGF0aW5Mb3dlcmNhc2U7XG5jb25zdCB1cHBlcmNhc2VDaGFycyA9IFwiQS1aXCIgKyBub25MYXRpblVwcGVyY2FzZTtcbmNvbnN0IGFsbENoYXJzID0gbG93ZXJjYXNlQ2hhcnMgKyB1cHBlcmNhc2VDaGFycztcbi8qXG4gKDM5KVx0XHRcdGR1bWIgc2luZ2xlIHF1b3RlXG4gKDgyMTYpXHRcdGxlZnQgc2luZ2xlIHF1b3RhdGlvbiBtYXJrXG4gKDgyMTcpXHRcdHJpZ2h0IHNpbmdsZSBxdW90YXRpb24gbWFya1xuICg3MDApXHRcdG1vZGlmaWVyIGxldHRlciBhcG9zdHJvcGhlOyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Nb2RpZmllcl9sZXR0ZXJfYXBvc3Ryb3BoZVxuICg4MjE5KVx0XHRzaW5nbGUgaGlnaC1yZXZlcnNlZC05IHF1b3RhdGlvbiBtYXJrXG4gKDgyNDIpXHRcdHByaW1lXG4gKDgyNDkpXHRcdHNpbmdsZSBsZWZ0LXBvaW50aW5nIGFuZ2xlIHF1b3RhdGlvbiBtYXJrXG4gKDgyNTApXHRcdHNpbmdsZSByaWdodC1wb2ludGluZyBhbmdsZSBxdW90YXRpb24gbWFya1xuICovXG5jb25zdCBzaW5nbGVRdW90ZUFkZXB0cyA9IFwi4oCafCd84oCYfOKAmXzKvHzigJt84oCyfOKAuXzigLpcIjtcbmNvbnN0IGRvdWJsZVF1b3RlQWRlcHRzID0gXCLigJ584oCcfOKAnXxcXFwifMKrfMK7fOKAs3wsezIsfXzigJh7Mix9fOKAmXsyLH18J3syLH184oC5ezIsfXzigLp7Mix9fOKAsnsyLH1cIjtcbmNvbnN0IHNwYWNlID0gXCIgXCI7XG5jb25zdCBuYnNwID0gXCLCoFwiO1xuY29uc3QgaGFpclNwYWNlID0gXCLigIpcIjsgLy8mIzgyMDI7XG5jb25zdCBuYXJyb3dOYnNwID0gXCLigK9cIjsgLy8mIzgyMzk7XG5jb25zdCBzcGFjZXMgPSBzcGFjZSArIG5ic3AgKyBoYWlyU3BhY2UgKyBuYXJyb3dOYnNwO1xuY29uc3QgdGVybWluYWxQdW5jdHVhdGlvbiA9IFwiXFwuXFwhXFw/XCI7XG5jb25zdCBzZW50ZW5jZVB1bmN0dWF0aW9uID0gXCJcXCxcXDpcXDtcIiArIHRlcm1pbmFsUHVuY3R1YXRpb247IC8vIHRoZXJlIGlzIG5vIGVsbGlwc2lzIGluIHRoZSBzZXQgYXMgaXQgaXMgYmVpbmcgdXNlZCB0aHJvdWdob3V0IGEgc2VudGVuY2UgaW4gdGhlIG1pZGRsZS4gUmV0aGluayB0aGlzIGdyb3VwIHRvIHNwbGl0IGl0IGludG8gZW5kLXNlbnRlbmNlIHB1bmN0dWF0aW9uIGFuZCBtaWRkbGUgc2VudGVuY2UgcHVuY3R1YXRpb25cbmNvbnN0IG9wZW5pbmdCcmFja2V0cyA9IFwiXFxcXChcXFxcW1xcXFx7XCI7XG5jb25zdCBjbG9zaW5nQnJhY2tldHMgPSBcIlxcXFwpXFxcXF1cXFxcfVwiO1xuY29uc3QgZWxsaXBzaXMgPSBcIuKAplwiO1xuY29uc3QgZGVncmVlID0gXCLCsFwiO1xuXG4vKlxuIFNvdXJjZSBmb3Igd2ViVXJsUGF0dGVybiwgZW1haWxBZGRyZXNzUGF0dGVyblxuIGh0dHA6Ly9ncmVwY29kZS5jb20vZmlsZS9yZXBvc2l0b3J5LmdyZXBjb2RlLmNvbS9qYXZhL2V4dC9jb20uZ29vZ2xlLmFuZHJvaWQvYW5kcm9pZC8yLjBfcjEvYW5kcm9pZC90ZXh0L3V0aWwvUmVnZXguamF2YSNSZWdleC4wV0VCX1VSTF9QQVRURVJOXG4gKi9cbmNvbnN0IHdlYlVybFBhdHRlcm4gPSBcIigoPzooaHR0cHxodHRwc3xIdHRwfEh0dHBzfHJ0c3B8UnRzcCk6XFxcXC9cXFxcLyg/Oig/OlthLXpBLVowLTlcXFxcJFxcXFwtXFxcXF9cXFxcLlxcXFwrXFxcXCFcXFxcKlxcXFwnXFxcXChcXFxcKVwiICtcbiAgXCJcXFxcLFxcXFw7XFxcXD9cXFxcJlxcXFw9XXwoPzpcXFxcJVthLWZBLUYwLTldezJ9KSl7MSw2NH0oPzpcXFxcOig/OlthLXpBLVowLTlcXFxcJFxcXFwtXFxcXF9cIiArXG4gIFwiXFxcXC5cXFxcK1xcXFwhXFxcXCpcXFxcJ1xcXFwoXFxcXClcXFxcLFxcXFw7XFxcXD9cXFxcJlxcXFw9XXwoPzpcXFxcJVthLWZBLUYwLTldezJ9KSl7MSwyNX0pP1xcXFxAKT8pP1wiICtcbiAgXCIoKD86KD86W2EtekEtWjAtOV1bYS16QS1aMC05XFxcXC1dezAsNjR9XFxcXC4pK1wiICsgIC8vIG5hbWVkIGhvc3RcbiAgXCIoPzpcIiArIC8vIHBsdXMgdG9wIGxldmVsIGRvbWFpblxuICBcIig/OmFlcm98YXJwYXxhc2lhfGFbY2RlZmdpbG1ub3Fyc3R1d3h6XSlcIiArXG4gIFwifCg/OmJpenxiW2FiZGVmZ2hpam1ub3JzdHZ3eXpdKVwiICtcbiAgXCJ8KD86Y2F0fGNvbXxjb29wfGNbYWNkZmdoaWtsbW5vcnV2eHl6XSlcIiArXG4gIFwifGRbZWprbW96XVwiICtcbiAgXCJ8KD86ZWR1fGVbY2VncnN0dV0pXCIgK1xuICBcInxmW2lqa21vcl1cIiArXG4gIFwifCg/OmdvdnxnW2FiZGVmZ2hpbG1ucHFyc3R1d3ldKVwiICtcbiAgXCJ8aFtrbW5ydHVdXCIgK1xuICBcInwoPzppbmZvfGludHxpW2RlbG1ub3Fyc3RdKVwiICtcbiAgXCJ8KD86am9ic3xqW2Vtb3BdKVwiICtcbiAgXCJ8a1tlZ2hpbW5yd3l6XVwiICtcbiAgXCJ8bFthYmNpa3JzdHV2eV1cIiArXG4gIFwifCg/Om1pbHxtb2JpfG11c2V1bXxtW2FjZGdoa2xtbm9wcXJzdHV2d3h5el0pXCIgK1xuICBcInwoPzpuYW1lfG5ldHxuW2FjZWZnaWxvcHJ1el0pXCIgK1xuICBcInwoPzpvcmd8b20pXCIgK1xuICBcInwoPzpwcm98cFthZWZnaGtsbW5yc3R3eV0pXCIgK1xuICBcInxxYVwiICtcbiAgXCJ8cltlb3V3XVwiICtcbiAgXCJ8c1thYmNkZWdoaWprbG1ub3J0dXZ5el1cIiArXG4gIFwifCg/OnRlbHx0cmF2ZWx8dFtjZGZnaGprbG1ub3BydHZ3el0pXCIgK1xuICBcInx1W2Fna21zeXpdXCIgK1xuICBcInx2W2FjZWdpbnVdXCIgK1xuICBcInx3W2ZzXVwiICtcbiAgXCJ8eVtldHVdXCIgK1xuICBcInx6W2Ftd10pKVwiICtcbiAgXCJ8KD86KD86MjVbMC01XXwyWzAtNF1cIiArIC8vIG9yIGlwIGFkZHJlc3NcbiAgXCJbMC05XXxbMC0xXVswLTldezJ9fFsxLTldWzAtOV18WzEtOV0pXFxcXC4oPzoyNVswLTVdfDJbMC00XVswLTldXCIgK1xuICBcInxbMC0xXVswLTldezJ9fFsxLTldWzAtOV18WzEtOV18MClcXFxcLig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAtMV1cIiArXG4gIFwiWzAtOV17Mn18WzEtOV1bMC05XXxbMS05XXwwKVxcXFwuKD86MjVbMC01XXwyWzAtNF1bMC05XXxbMC0xXVswLTldezJ9XCIgK1xuICBcInxbMS05XVswLTldfFswLTldKSkpXCIgK1xuICBcIig/OlxcXFw6XFxcXGR7MSw1fSk/KVwiICsgLy8gcGx1cyBvcHRpb24gcG9ydCBudW1iZXIgK1xuICBcIihcXFxcLyg/Oig/OlthLXpBLVowLTlcXFxcO1xcXFwvXFxcXD9cXFxcOlxcXFxAXFxcXCZcXFxcPVxcXFwjXFxcXH5cIiArIC8vIHBsdXMgb3B0aW9uIHF1ZXJ5IHBhcmFtc1xuICBcIlxcXFwtXFxcXC5cXFxcK1xcXFwhXFxcXCpcXFxcJ1xcXFwoXFxcXClcXFxcLFxcXFxfXSl8KD86XFxcXCVbYS1mQS1GMC05XXsyfSkpKik/XCIgK1xuICBcIig/OlxcXFxifCQpXCI7IC8vIGFuZCBmaW5hbGx5LCBhIHdvcmQgYm91bmRhcnkgb3IgZW5kIG9mXG4vLyBpbnB1dC4gIFRoaXMgaXMgdG8gc3RvcCBmb28uc3VyZSBmcm9tXG4vLyBtYXRjaGluZyBhcyBmb28uc3VcblxuXG5jb25zdCBlbWFpbEFkZHJlc3NQYXR0ZXJuID0gXCJbYS16QS1aMC05XFxcXCtcXFxcLlxcXFxfXFxcXCVcXFxcLV17MSwyNTZ9XCIgK1xuICBcIlxcXFxAXCIgK1xuICBcIlthLXpBLVowLTldW2EtekEtWjAtOVxcXFwtXXswLDY0fVwiICtcbiAgXCIoXCIgK1xuICBcIlxcXFwuXCIgK1xuICBcIlthLXpBLVowLTldW2EtekEtWjAtOVxcXFwtXXswLDI1fVwiICtcbiAgXCIpK1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5vbkxhdGluTG93ZXJjYXNlLFxuICBub25MYXRpblVwcGVyY2FzZSxcbiAgbm9uTGF0aW5DaGFycyxcbiAgbG93ZXJjYXNlQ2hhcnMsXG4gIHVwcGVyY2FzZUNoYXJzLFxuICBhbGxDaGFycyxcbiAgc2luZ2xlUXVvdGVBZGVwdHMsXG4gIGRvdWJsZVF1b3RlQWRlcHRzLFxuICBzcGFjZSxcbiAgbmJzcCxcbiAgaGFpclNwYWNlLFxuICBuYXJyb3dOYnNwLFxuICBzcGFjZXMsXG4gIHRlcm1pbmFsUHVuY3R1YXRpb24sXG4gIHNlbnRlbmNlUHVuY3R1YXRpb24sXG4gIG9wZW5pbmdCcmFja2V0cyxcbiAgY2xvc2luZ0JyYWNrZXRzLFxuICBlbGxpcHNpcyxcbiAgZGVncmVlLFxuICB3ZWJVcmxQYXR0ZXJuLFxuICBlbWFpbEFkZHJlc3NQYXR0ZXJuLFxufVxuIiwiLypcclxuXHRSZW1vdmVzIGVtcHR5IGxpbmVzXHJcblxyXG5cdEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXHJcblx0QHJldHVybnMge3N0cmluZ30g4oCUIG91dHB1dCB3aXRoIHJlbW92ZWQgZW1wdHkgbGluZXNcclxuKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUVtcHR5TGluZXMoc3RyaW5nKSB7XHJcblx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC9eXFxzKy9nbSwgXCJcIik7XHJcbn1cclxuIiwiY29uc3Qgc3ltYm9scyA9IHtcclxuICBcIlxcXFwoQ1xcXFwpXCI6IFwiwqlcIixcclxuICBcIlxcXFwoY1xcXFwpXCI6IFwiwqlcIixcclxuXHRcIlxcXFwoUFxcXFwpXCI6IFwi4pOFXCIsXHJcblx0XCJcXFxcKHBcXFxcKVwiOiBcIuKThVwiLFxyXG4gIFwiXFxcXChSXFxcXClcIjogXCLCrlwiLFxyXG4gIFwiXFxcXChyXFxcXClcIjogXCLCrlwiLFxyXG4gIFwiXFxcXChUTVxcXFwpXCI6IFwi4oSiXCIsXHJcbiAgXCJcXFxcKHRtXFxcXClcIjogXCLihKJcIixcclxuICBcIlxcXFwrXFxcXC1cIjogXCLCsVwiLFxyXG4gIFwiXFxcXC1cXFxcK1wiOiBcIsKxXCIsXHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZVN5bWJvbHMoc3RyaW5nKSB7XHJcblx0Zm9yICh2YXIgc3ltYm9sIGluIHN5bWJvbHMpIHtcclxuXHRcdGNvbnN0IHJlID0gbmV3IFJlZ0V4cChzeW1ib2wsIFwiZ1wiKTtcclxuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBzeW1ib2xzW3N5bWJvbF0pO1xyXG5cdH1cclxuXHRyZXR1cm4gc3RyaW5nO1xyXG59XHJcbiIsIi8qIVxuICogVHlwb3BvIDEuNC4wXG4gKlxuICogQ29weXJpZ2h0IDIwMTUtMTcgQnJhxYhvIMWgYW5kYWxhXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqXG4gKiBEYXRlOiAyMDE3LTAxLTE1XG4gKi9cblxuaW1wb3J0IHtyZXBsYWNlU3ltYm9sc30gZnJvbSBcIi4vbGliL3N5bWJvbC1yZXBsYWNlbWVudHNcIjtcbmltcG9ydCB7cmVtb3ZlRW1wdHlMaW5lc30gZnJvbSBcIi4vbGliL2VtcHR5LWxpbmVzXCI7XG5pbXBvcnQgY29uc3RhbnRzIGZyb20gJy4vbGliL2NvbnN0YW50cyc7XG5cblxudmFyIGV4Y2VwdGlvbnMgPSBbXTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKlxcXG5cdEVzZW50aWFsIHJlcGxhY2VtZW50c1xuXFwqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblxuXG5mdW5jdGlvbiByZXBsYWNlX3BlcmlvZHNfd2l0aF9lbGxpcHNpcyhzdHJpbmcpIHtcblx0LyogWzFdIHJlcGxhY2UgMyBhbmQgbW9yZSBkb3RzIHdpdGggYW4gZWxsaXBzaXMgKi9cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xcLnszLH0vZywgXCLigKZcIik7XG5cblx0LyogWzJdIHJlcGxhY2UgMiBkb3RzIGluIHRoZSBtaWRkbGUgb2YgdGhlIHNlbnRlY25lIHdpdGggYW4gYXBvc2lvcGVzaXMgKi9cblx0dmFyIHBhdHRlcm4gPSBcIltcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl1cXFxcLnsyfVtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl1cIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiDigKYgXCIpO1xuXG5cdC8qIFszXSByZXBsYWNlIDIgZG90cyBhdCB0aGUgZW5kIG9mIHRoZSBzZW50ZWNuZSB3aXRoIGZ1bGwgc3RvcCAqL1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFwuezJ9L2csIFwiLlwiKTtcblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuZnVuY3Rpb24gcmVtb3ZlX211bHRpcGxlX3NwYWNlcyhzdHJpbmcpIHtcblx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC8gezIsfS9nLCBcIiBcIik7XG59XG5cblxuXG5cblxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qXFxcblx0UXVvdGVzLCBwcmltZXMgJiBhcG9zdHJvcGhlc1xuXFwqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblxuXG4vKlxuXHRDb3JyZWN0cyBpbXByb3BlciB1c2Ugb2YgZG91YmxlIHF1b3RlcyBhbmQgZG91YmxlIHByaW1lc1xuXG5cdEFzc3VtcHRpb25zIGFuZCBMaW1pdGF0aW9uc1xuXHRUaGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBkb3VibGUgcXVvdGVzIGFyZSBhbHdheXMgdXNlZCBpbiBwYWlyLFxuXHRpLmUuIGF1dGhvcnMgZGlkIG5vdCBmb3JnZXQgdG8gY2xvc2UgZG91YmxlIHF1b3RlcyBpbiB0aGVpciB0ZXh0LlxuXG5cdEFsZ29yaXRobVxuXHRbMF0gUmVtb3ZlIGV4dHJhIHRlcm1pbmFsIHB1bmN0dWF0aW9uIGFyb3VuZCBkb3VibGUgcXVvdGVzXG5cdFsxXSBTd2FwIHJpZ2h0IGRvdWJsZSBxdW90ZSBhZGVwdHMgd2l0aCBhIHB1bmN0dWF0aW9uXG5cdCAgICAodGhpcyBjb21lcyBmaXJzdCBhcyBpdCBpcyBhIHF1aXRlIGNvbW1vbiBtaXN0YWtlIHRoYXQgbWF5IGV2ZW50dWFsbHlcblx0XHQgIGxlYWQgdG8gaW1wcm9wZXIgaWRlbnRpZmljYXRpb24gb2YgZG91YmxlIHByaW1lcylcblx0WzJdIElkZW50aWZ5IGluY2hlcywgYXJjc2Vjb25kcywgc2Vjb25kc1xuXHRbM10gSWRlbnRpZnkgY2xvc2VkIGRvdWJsZSBxdW90ZXNcblx0WzRdIElkZW50aWZ5IHRoZSByZXN0IGFzIHVuY2xvc2VkIGRvdWJsZSBxdW90ZXMgKGJlc3QtZWZmb3J0IHJlcGxhY2VtZW50KVxuXHRbNV0gRml4IHNwYWNpbmcgYXJvdW5kIHF1b3RlcyBhbmQgcHJpbWVzXG5cdFs2XSBTd2FwIGJhY2sgc29tZSBvZiB0aGUgZG91YmxlIHF1b3RlcyB3aXRoIGEgcHVuY3R1YXRpb25cblx0WzddIFJlbW92ZSBleHRyYSBwdW5jdHVhdGlvbiBhcm91bmQgcXVvdGVzXG5cdFs4XSBSZXBsYWNlIGFsbCBpZGVudGlmaWVkIHB1bmN0dWF0aW9uIHdpdGggYXBwcm9wcmlhdGUgcHVuY3R1YXRpb24gaW5cblx0ICAgIGdpdmVuIGxhbmd1YWdlXG5cblx0QHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cblx0QHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlIOKAlCBsYW5ndWFnZSBvcHRpb25cblx0QHJldHVybnMge3N0cmluZ30gb3V0cHV0IHdpdGggcHJvcGVybHkgcmVwbGFjZXMgZG91YmxlIHFvdXRlcyBhbmQgZG91YmxlIHByaW1lc1xuKi9cbmZ1bmN0aW9uIGNvcnJlY3RfZG91YmxlX3F1b3Rlc19hbmRfcHJpbWVzKHN0cmluZywgbGFuZ3VhZ2UpIHtcblxuXHQvKiBbMF0gUmVtb3ZlIGV4dHJhIHRlcm1pbmFsIHB1bmN0dWF0aW9uIGFyb3VuZCBkb3VibGUgcXVvdGVzXG5cdFx0XHRcdFx0IGUuZy4g4oCcV2Ugd2lsbCBjb250aW51ZSB0b21vcnJvdy7igJ0uICovXG5cdHZhciBwYXR0ZXJuID0gXCIoW1wiICsgY29uc3RhbnRzLnNlbnRlbmNlUHVuY3R1YXRpb24gKyBcIl0pKFwiKyBjb25zdGFudHMuZG91YmxlUXVvdGVBZGVwdHMgKyBcIikoW1wiICsgY29uc3RhbnRzLnNlbnRlbmNlUHVuY3R1YXRpb24gKyBcIl0pXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQyXCIpO1xuXG5cdC8qIFsxXSBTd2FwIHJpZ2h0IGRvdWJsZSBxdW90ZSBhZGVwdHMgd2l0aCBhIHRlcm1pbmFsIHB1bmN0dWF0aW9uICovXG5cdHBhdHRlcm4gPSBcIihcIisgY29uc3RhbnRzLmRvdWJsZVF1b3RlQWRlcHRzICsgXCIpKFtcIiArIGNvbnN0YW50cy50ZXJtaW5hbFB1bmN0dWF0aW9uICsgXCJdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgJyQyJDEnKTtcblxuXHQvKiBbMl0gSWRlbnRpZnkgaW5jaGVzLCBhcmNzZWNvbmRzLCBzZWNvbmRzXG5cdFx0XHRcdCBOb3RlOiB3ZeKAmXJlIG5vdCB1c2luZyBjb25zdGFudHMuZG91YmxlUXVvdGVBZGVwdHMgdmFyaWFibGVcblx0XHRcdFx0IGFzIGNvbW1hcyBhbmQgbG93LXBvc2l0aW9uZWQgcXVvdGVzIGFyZSBvbW1pdGVkKi9cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhcXGQgPyko4oCcfOKAnXxcXFwifOKAs3zigJh7Mix9fOKAmXsyLH18J3syLH184oCyezIsfSkvZywgXCIkMXt7dHlwb3BvX19kb3VibGUtcHJpbWV9fVwiKTtcblxuXG5cdC8qIFszXSBJZGVudGlmeSBjbG9zZWQgZG91YmxlIHF1b3RlcyAqL1xuXHRwYXR0ZXJuID0gXCIoXCIgKyBjb25zdGFudHMuZG91YmxlUXVvdGVBZGVwdHMgKyBcIikoLio/KShcIiArIGNvbnN0YW50cy5kb3VibGVRdW90ZUFkZXB0cyArIFwiKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCJ7e3R5cG9wb19fbGVmdC1kb3VibGUtcXVvdGV9fSQye3t0eXBvcG9fX3JpZ2h0LWRvdWJsZS1xdW90ZX19XCIpO1xuXG5cblx0LyogWzQuMV0gSWRlbnRpZnkgdW5jbG9zZWQgbGVmdCBkb3VibGUgcXVvdGUgKi9cblx0cGF0dGVybiA9IFwiKFwiICsgY29uc3RhbnRzLmRvdWJsZVF1b3RlQWRlcHRzICsgXCIpKFtcIiArIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArIFwiXSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwie3t0eXBvcG9fX2xlZnQtZG91YmxlLXF1b3RlfX0kMlwiKTtcblxuXG5cdC8qIFs0LjJdIElkZW50aWZ5IHVuY2xvc2VkIHJpZ2h0IGRvdWJsZSBxdW90ZSAqL1xuXHRwYXR0ZXJuID0gXCIoW1wiICsgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICsgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICsgY29uc3RhbnRzLnNlbnRlbmNlUHVuY3R1YXRpb24gKyBjb25zdGFudHMuZWxsaXBzaXMgKyBcIl0pKFwiICsgY29uc3RhbnRzLmRvdWJsZVF1b3RlQWRlcHRzICsgXCIpXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxe3t0eXBvcG9fX3JpZ2h0LWRvdWJsZS1xdW90ZX19XCIpO1xuXG5cblx0LyogWzQuM10gUmVtb3ZlIHJlbWFpbmluZyB1bmlkZW50aWZpZWQgZG91YmxlIHF1b3RlICovXG5cdHBhdHRlcm4gPSBcIihbXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdKShcIiArIGNvbnN0YW50cy5kb3VibGVRdW90ZUFkZXB0cyArIFwiKShbXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQzXCIpO1xuXG5cblx0LyogWzVdIEZpeCBzcGFjaW5nIGFyb3VuZCBxdW90ZXMgYW5kIHByaW1lICovXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oe3t0eXBvcG9fX2xlZnQtZG91YmxlLXF1b3RlfX0pKCApL2csIFwiJDFcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oICkoe3t0eXBvcG9fX3JpZ2h0LWRvdWJsZS1xdW90ZX19KS9nLCBcIiQyXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKCApKHt7dHlwb3BvX19kb3VibGUtcHJpbWV9fSkvZywgXCIkMlwiKTtcblxuXG5cdC8qIFs2XSBTd2FwIGJhY2sgc29tZSBvZiB0aGUgZG91YmxlIHF1b3RlcyB3aXRoIGEgcHVuY3R1YXRpb25cblxuXHRcdCBJZGVhXG5cdFx0IEluIFsxXSB3ZSBoYXZlIHN3YXBwZWQgYWxsIGRvdWJsZSByaWdodCBxdW90ZXMgYnkgZGVmYXVsdCB3aXRoIGEgdGVybWluYWxcblx0XHQgcHVuY3R1YXRpb24uIEhvd2V2ZXIsIG5vdCBhbGwgZG91YmxlIHF1b3RlcyB3cmFwIHRoZSB3aG9sZSBzZW50ZW5jZSBhbmRcblx0XHQgdGhlcmUgYXJlIGNhc2VzIHdoZW4gZmV3IHdvcmRzIGFyZSBxdW90ZWQgd2l0aGluIGEgc2VudGVuY2UuIFRha2UgYSBsb29rIGF0XG5cdFx0IGV4YW1wbGVzOlxuXHRcdCDigJxTZW50ZW5jZSBxb3V0ZWQgYXMgYSB3aG9sZS7igJ0gKGZ1bGwgc3RvcCBpcyBwbGFjZWQgd2l0aGluIGRvdWJsZSBxdW90ZXMpXG5cdFx0IFRoaXMgaXMg4oCccXVvdGVkIGV4cHJlc3Npb24u4oCdIChmdWxsIHN0b3AgaXMgcGxhY2VkIG91dHNpZGUgZG91YmxlIHF1b3RlcylcblxuXHRcdCBBbGdvcml0aG1cblx0XHQgTWF0Y2ggYWxsIHRoZSBkb3VibGUgcXVvdGUgcGFpcnMgdGhhdCBkbyBub3QgcHJlY2VkZSBzZW50ZW5jZSBwdW5jdHVhdGlvblxuXHRcdCAoYW5kIHRodXMgbXVzdCBiZSB1c2VkIHdpdGhpbiBhIHNlbnRlbmNlKSBhbmQgc3dhcCByaWdodCBkb3VibGUgd2l0aFxuXHRcdCBhIHRlcm1pbmFsIHB1bmN0dWF0aW9uLlxuXHRcdCAqL1xuXHRwYXR0ZXJuID0gXCIoW15cIiArIGNvbnN0YW50cy5zZW50ZW5jZVB1bmN0dWF0aW9uICsgXCJdW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXXt7dHlwb3BvX19sZWZ0LWRvdWJsZS1xdW90ZX19Lis/KShbXCIgKyBjb25zdGFudHMudGVybWluYWxQdW5jdHVhdGlvbiArIFwiXSkoe3t0eXBvcG9fX3JpZ2h0LWRvdWJsZS1xdW90ZX19KVwiO1xuXHQvLyBjb25zb2xlLmxvZyhwYXR0ZXJuKTtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEkMyQyXCIpO1xuXG5cblx0LyogWzddIFJlbW92ZSBleHRyYSBjb21tYSBhZnRlciBwdW5jdHVhdGlvbiBpbiBkaXJlY3Qgc3BlZWNoLFxuXHRcdFx0XHRcdCBlLmcuIFwi4oCcSGV5ISzigJ0gc2hlIHNhaWRcIiAqL1xuXHRwYXR0ZXJuID0gXCIoW1wiICsgY29uc3RhbnRzLnNlbnRlbmNlUHVuY3R1YXRpb24gKyBcIl0pKFtcXCxdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMVwiKTtcblxuXG5cdC8qIFs4XSBQdW5jdHVhdGlvbiByZXBsYWNlbWVudCAqL1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKHt7dHlwb3BvX19kb3VibGUtcHJpbWV9fSkvZywgXCLigLNcIik7XG5cblx0c3dpdGNoIChsYW5ndWFnZSkge1xuXHRcdGNhc2UgXCJydWVcIjpcblx0XHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oe3t0eXBvcG9fX2xlZnQtZG91YmxlLXF1b3RlfX0pL2csIFwiwqtcIik7XG5cdFx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKHt7dHlwb3BvX19yaWdodC1kb3VibGUtcXVvdGV9fSkvZywgXCLCu1wiKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJza1wiOlxuXHRcdGNhc2UgXCJjc1wiOlxuXHRcdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyh7e3R5cG9wb19fbGVmdC1kb3VibGUtcXVvdGV9fSkvZywgXCLigJ5cIik7XG5cdFx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKHt7dHlwb3BvX19yaWdodC1kb3VibGUtcXVvdGV9fSkvZywgXCLigJxcIik7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiZW5cIjpcblx0XHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oe3t0eXBvcG9fX2xlZnQtZG91YmxlLXF1b3RlfX0pL2csIFwi4oCcXCIpO1xuXHRcdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyh7e3R5cG9wb19fcmlnaHQtZG91YmxlLXF1b3RlfX0pL2csIFwi4oCdXCIpO1xuXHRcdFx0YnJlYWs7XG5cdH1cblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuLypcblx0Q29ycmVjdHMgaW1wcm9wZXIgdXNlIG9mIHNpbmdsZSBxdW90ZXMsIHNpbmdsZSBwcmltZXMgYW5kIGFwb3N0cm9waGVzXG5cblx0QXNzdW1wdGlvbnMgYW5kIExpbWl0YXRpb25zXG5cdFRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IGRvdWJsZSBxdW90ZXMgYXJlIGFsd2F5cyB1c2VkIGluIHBhaXIsXG5cdGkuZS4gYXV0aG9ycyBkaWQgbm90IGZvcmdldCB0byBjbG9zZSBkb3VibGUgcXVvdGVzIGluIHRoZWlyIHRleHQuXG5cdEZ1cnRoZXIsIHNpbmdsZSBxdW90ZXMgYXJlIHVzZWQgYXMgc2Vjb25kYXJ5IGFuZCB0aGV5J3JlIHByb3Blcmx5IHNwYWNlZCxcblx0ZS5nLiDikKMnd29yZCBvciBzZW50ZW5jZSBwb3J0aW9uJ+KQoyAoYW5kIG5vdCBsaWtlIOKQoyfikKN3b3Jk4pCjJ+KQoylcblxuXHRBbGdvcml0aG1cblx0WzFdIElkZW50aWZ5IGNvbW1vbiBhcG9zdHJvaGUgY29udHJhY3Rpb25zXG5cdFsyXSBJZGVudGlmeSBzaW5nbGUgcXVvdGVzXG5cdFszXSBJZGVudGlmeSBmZWV0LCBhcmNtaW51dGVzLCBtaW51dGVzXG5cdFs0XSBJZGVudGlmeSByZXNpZHVhbCBhcG9zdHJvcGhlcyB0aGF0IGhhdmUgbGVmdFxuXHRbP10gU3dhcCByaWdodCBzaW5nbGUgcXVvdGUgYWRlcHRzIHdpdGggYSBwdW50dWF0aW9uXG5cdFx0XHQoV2Ugd2VyZSBzd2FwcGluZyBzaW5nbGUgcXVvdGVzIGFzIHBhcnQgb2YgYWxnb3JpdGhtIGEgd2hpbGUgYSBiYWNrLFxuXHRcdFx0YnV0IHNpbmNlIGl0IGlzIG1vcmUgcHJvYmFibGUgdGhhdCBzaW5nbGUgcXVvdGVzIGFyZSBpbiB0aGUgbWlkZGxlIG9mIHRoZVxuXHRcdFx0c2VudGVuY2UsIHdlIGhhdmFlIGRyb3BwZWQgc3dhcHBpbmcgYXMgYSBwYXJ0IG9mIHRoZSBhbGdvcml0aG0pXG5cdFs2XSBSZXBsYWNlIGFsbCBpZGVudGlmaWVkIHB1bmN0dWF0aW9uIHdpdGggYXBwcm9wcmlhdGUgcHVuY3R1YXRpb24gaW5cblx0ICAgIGdpdmVuIGxhbmd1YWdlXG5cblx0QHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cblx0QHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlIOKAlCBsYW5ndWFnZSBvcHRpb25zXG5cdEByZXR1cm5zIHtzdHJpbmd9IOKAlCBjb3JyZWN0ZWQgb3V0cHV0XG4qL1xuZnVuY3Rpb24gY29ycmVjdF9zaW5nbGVfcXVvdGVzX3ByaW1lc19hbmRfYXBvc3Ryb3BoZXMoc3RyaW5nLCBsYW5ndWFnZSkge1xuXG5cdC8qIFsxLjFdIElkZW50aWZ5IOKAmW7igJkgY29udHJhY3Rpb25zICovXG5cdHZhciBwYXR0ZXJuID0gXCIoXCIgKyBjb25zdGFudHMuc2luZ2xlUXVvdGVBZGVwdHMgKyBcIikobikoXCIgKyBjb25zdGFudHMuc2luZ2xlUXVvdGVBZGVwdHMgKyBcIilcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdpXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCJ7e3R5cG9wb19fYXBvc3Ryb3BoZX19JDJ7e3R5cG9wb19fYXBvc3Ryb3BoZX19XCIpO1xuXG5cblx0LyogWzEuMl0gSWRlbnRpZnkgY29tbW9uIGNvbnRyYWN0aW9ucyBhdCB0aGUgYmVnaW5uaW5nIG9yIGF0IHRoZSBlbmRcblx0XHRcdFx0XHQgb2YgdGhlIHdvcmQsIGUuZy4gRmlzaCDigJlu4oCZIENoaXBzLCDigJllbSwg4oCZY2F1c2Us4oCmICovXG5cdHZhciBjb250cmFjdGlvbl9leGFtcGxlcyA9IFwiZW18Y2F1c2V8dHdhc3x0aXN8dGlsfHJvdW5kXCJcblx0cGF0dGVybiA9IFwiKFwiICsgY29uc3RhbnRzLnNpbmdsZVF1b3RlQWRlcHRzICsgXCIpKFwiICsgY29udHJhY3Rpb25fZXhhbXBsZXMgKyBcIilcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ2lcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcInt7dHlwb3BvX19hcG9zdHJvcGhlfX0kMlwiKTtcblxuXG5cdC8qIFsxLjNdIElkZW50aWZ5IGluLXdvcmQgY29udHJhY3Rpb25zLFxuXHRcdFx0XHRcdCBlLmcuIERvbuKAmXQsIEnigJltLCBP4oCZRG9vbGUsIDY54oCZZXJzICovXG5cdHZhciBjaGFyYWN0ZXJfYWRlcHRzID0gXCIwLTlcIiArIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycztcblx0cGF0dGVybiA9IFwiKFtcIisgY2hhcmFjdGVyX2FkZXB0cyArXCJdKShcIiArIGNvbnN0YW50cy5zaW5nbGVRdW90ZUFkZXB0cyArIFwiKShbXCIrIGNoYXJhY3Rlcl9hZGVwdHMgK1wiXSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDF7e3R5cG9wb19fYXBvc3Ryb3BoZX19JDNcIik7XG5cblxuXHQvKiBbMS40XSBJZGVudGlmeSB5ZWFyIGNvbnRyYWN0aW9uc1xuXHRcdCBlLmcuIOKAmTcwcywgSU5DSEVCQSDigJk4OSzigKYgKi9cblx0cGF0dGVybiA9IFwiKFwiICsgY29uc3RhbnRzLnNpbmdsZVF1b3RlQWRlcHRzICsgXCIpKFswLTldezJ9KVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCJ7e3R5cG9wb19fYXBvc3Ryb3BoZX19JDJcIik7XG5cblxuXHQvKiBbMl0gSWRlbnRpZnkgc2luZ2xlIHF1b3RlcyB3aXRoaW4gZG91YmxlIHF1b3RlcyAqL1xuXHRwYXR0ZXJuID0gXCIoXCIgKyBjb25zdGFudHMuZG91YmxlUXVvdGVBZGVwdHMgKyBcIikoLio/KShcIiArIGNvbnN0YW50cy5kb3VibGVRdW90ZUFkZXB0cyArIFwiKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgZnVuY3Rpb24oJDAsICQxLCAkMiwgJDMpe1xuXG5cdFx0Ly9pZGVudGlmeSB7e3R5cG9wb19fbGVmdC1zaW5nbGUtcXVvdGUtLWFkZXB0fX1cblx0XHR2YXIgcGF0dGVybiA9IFwiKCApKFwiICsgY29uc3RhbnRzLnNpbmdsZVF1b3RlQWRlcHRzICsgXCIpKFtcIisgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICsgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICtcIl0pXCI7XG5cdFx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdFx0JDIgPSAkMi5yZXBsYWNlKHJlLCBcIiQxe3t0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlLS1hZGVwdH19JDNcIik7XG5cblx0XHQvL2lkZW50aWZ5IHt7dHlwb3BvX19yaWdodC1zaW5nbGUtcXVvdGUtLWFkZXB0fX1cblx0XHRwYXR0ZXJuID0gXCIoW1wiKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgK1wiXSkoW1xcLiwhP10pPyhcIiArIGNvbnN0YW50cy5zaW5nbGVRdW90ZUFkZXB0cyArIFwiKShbIF18W1xcLiwhP10pXCI7XG5cdFx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0XHQkMiA9ICQyLnJlcGxhY2UocmUsIFwiJDEkMnt7dHlwb3BvX19yaWdodC1zaW5nbGUtcXVvdGUtLWFkZXB0fX0kNFwiKTtcblxuXHRcdC8vaWRlbnRpZnkgc2luZ2xlIHF1b3RlIHBhaXJzXG5cdFx0cGF0dGVybiA9IFwiKHt7dHlwb3BvX19sZWZ0LXNpbmdsZS1xdW90ZS0tYWRlcHR9fSkoLio/KSh7e3R5cG9wb19fcmlnaHQtc2luZ2xlLXF1b3RlLS1hZGVwdH19KVwiO1xuXHRcdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdFx0JDIgPSAkMi5yZXBsYWNlKHJlLCBcInt7dHlwb3BvX19sZWZ0LXNpbmdsZS1xdW90ZX19JDJ7e3R5cG9wb19fcmlnaHQtc2luZ2xlLXF1b3RlfX1cIik7XG5cblx0XHRyZXR1cm4gJDEgKyAkMiArICQzO1xuXHR9KTtcblxuXG5cdC8qIFszXSBJZGVudGlmeSBmZWV0LCBhcmNtaW51dGVzLCBtaW51dGVzXG5cdFx0XHRcdCBOb3RlOiB3ZeKAmXJlIG5vdCB1c2luZyBjb25zdGFudHMuc2luZ2xlUXVvdGVBZGVwdHMgdmFyaWFibGVcblx0XHRcdFx0IGFzIGNvbW1hcyBhbmQgbG93LXBvc2l0aW9uZWQgcXVvdGVzIGFyZSBvbW1pdGVkKi9cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhcXGQpKCA/KSgnfOKAmHzigJl84oCbfOKAsikvZywgXCIkMXt7dHlwb3BvX19zaW5nbGUtcHJpbWV9fVwiKTtcblxuXG5cdC8qIFs0XSBJZGVudGlmeSByZXNpZHVhbCBhcG9zdHJvcGhlcyB0aGF0IGhhdmUgbGVmdCAqL1xuXHRwYXR0ZXJuID0gXCIoXCIgKyBjb25zdGFudHMuc2luZ2xlUXVvdGVBZGVwdHMgKyBcIilcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwie3t0eXBvcG9fX2Fwb3N0cm9waGV9fVwiKTtcblxuXG5cblx0LyogWzVdIFB1bmN0dWF0aW9uIHJlcGxhY2VtZW50ICovXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oe3t0eXBvcG9fX3NpbmdsZS1wcmltZX19KS9nLCBcIuKAslwiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL3t7dHlwb3BvX19hcG9zdHJvcGhlfX18e3t0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlLS1hZGVwdH19fHt7dHlwb3BvX19yaWdodC1zaW5nbGUtcXVvdGUtLWFkZXB0fX0vZywgXCLigJlcIik7XG5cblxuXHRzd2l0Y2ggKGxhbmd1YWdlKSB7XG5cdGNhc2UgXCJydWVcIjpcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgve3t0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlfX0vZywgXCLigLlcIik7XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL3t7dHlwb3BvX19yaWdodC1zaW5nbGUtcXVvdGV9fS9nLCBcIuKAulwiKTtcblx0XHRicmVhaztcblx0Y2FzZSBcInNrXCI6XG5cdGNhc2UgXCJjc1wiOlxuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC97e3R5cG9wb19fbGVmdC1zaW5nbGUtcXVvdGV9fS9nLCBcIuKAmlwiKTtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgve3t0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZX19L2csIFwi4oCYXCIpO1xuXHRcdGJyZWFrO1xuXHRjYXNlIFwiZW5cIjpcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgve3t0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlfX0vZywgXCLigJhcIik7XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL3t7dHlwb3BvX19yaWdodC1zaW5nbGUtcXVvdGV9fS9nLCBcIuKAmVwiKTtcblx0fVxuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG5mdW5jdGlvbiBjb3JyZWN0X211bHRpcGxlX3NpZ24oc3RyaW5nKSB7XG5cdHJldHVybiByZW1vdmVfbXVsdGlwbGVfc3BhY2VzKHN0cmluZy5yZXBsYWNlKC8oWzEtOV0rWyBdezAsMX1bYS13el0qKShbIF17MCwxfVt4fMOXXVsgXXswLDF9KShbMS05XStbIF17MCwxfVthLXd6XSopL2csIFwiJDEgw5cgJDNcIikpO1xufVxuXG5cblxuLypcblx0UmVwbGFjZXMgaHlwaGVuIHdpdGggZW0gb3IgZW4gZGFzaFxuXG5cdEFsZ29yaXRobVxuXHRbMV0gUmVwbGFjZSAzIGNvbnNlY3V0aXZlIGh5cGhlbnMgKC0tLSkgd2l0aCBhbiBlbSBkYXNoICjigJQpXG5cdFsyXSBSZXBsYWNlIDIgY29uc2VjdXRpdmUgaHlwaGVucyAoLS0pIHdpdGggYW4gZW4gZGFzaCAo4oCUKVxuXHRbM10gUmVwbGFjZSBhbnkgaHlwaGVuIG9yIGRhc2ggc3Vycm91bmRlZCB3aXRoIHNwYWNlcyB3aXRoIGFuIGVtIGRhc2hcblx0WzRdIFJlcGxhY2UgaHlwaGVuIG9yIGRhc2ggdXNlZCBpbiBudW1iZXIgcmFuZ2Ugd2l0aCBhbiBlbiBkYXNoXG5cdFx0XHRhbmQgc2V0IHByb3BlciBzcGFjaW5nXG5cblx0QHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cblx0QHJldHVybnMge3N0cmluZ30g4oCUIG91dHB1dCB3aXRoIGRhc2hlcyBpbnN0ZWFkIG9mIGh5cGhlbnNcbiovXG5mdW5jdGlvbiByZXBsYWNlX2h5cGhlbl93aXRoX2Rhc2goc3RyaW5nLCBsYW5ndWFnZSkge1xuXHR2YXIgZGFzaGVzID0gXCIt4oCT4oCUXCI7IC8vIGluY2x1ZGluZyBhIGh5cGhlblxuXG5cdC8qIFsxXSBSZXBsYWNlIDMgY29uc2VjdXRpdmUgaHlwaGVucyAoLS0tKSB3aXRoIGFuIGVtIGRhc2ggKOKAlCkgKi9cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLygtLS0pL2csIFwi4oCUXCIpO1xuXG5cblx0LyogWzJdIFJlcGxhY2UgMiBjb25zZWN1dGl2ZSBoeXBoZW5zICgtLSkgd2l0aCBhbiBlbiBkYXNoICjigJQpICovXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oLS0pL2csIFwi4oCTXCIpO1xuXG5cblx0LyogWzNdIFJlcGxhY2UgYW55IGh5cGhlbiBvciBkYXNoIHN1cnJvdW5kZWQgd2l0aCBzcGFjZXMgd2l0aCBhbiBlbSBkYXNoICovXG5cdHZhciBwYXR0ZXJuID0gXCJbXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdW1wiICsgZGFzaGVzICsgXCJdW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0dmFyIHJlcGxhY2VtZW50ID0gY29uc3RhbnRzLm5hcnJvd05ic3AgKyBcIuKAlFwiICsgY29uc3RhbnRzLmhhaXJTcGFjZTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblxuXHQvKiBbNC4xXSBSZXBsYWNlIGh5cGhlbiBvciBkYXNoLCBwbGFjZWQgYmV0d2VlbiAyIGNhcmRpbmFsIG51bWJlcnMsXG5cdFx0XHRcdFx0IHdpdGggYW4gZW4gZGFzaDsgaW5jbHVkaW5nIGNhc2VzIHdoZW4gdGhlcmUgaXMgYW4gZXh0cmEgc3BhY2Vcblx0XHRcdFx0XHQgZnJvbSBlaXRoZXIgb25lIHNpZGUgb3IgYm90aCBzaWRlcyBvZiB0aGUgZGFzaCAqL1xuXHR2YXIgY2FyZGluYWxfbnVtYmVyID0gXCJcXFxcZCtcIjtcblx0cGF0dGVybiA9IFwiKFwiICsgY2FyZGluYWxfbnVtYmVyICsgXCIpKFtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl0/W1wiICsgZGFzaGVzICsgXCJdW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXT8pKFwiICsgY2FyZGluYWxfbnVtYmVyICsgXCIpXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQx4oCTJDNcIik7XG5cblxuXHQvKiBbNC4yXSBSZXBsYWNlIGh5cGhlbiBvciBkYXNoLCBwbGFjZWQgYmV0d2VlbiAyIG9yZGluYWwgbnVtYmVycyxcblx0XHRcdFx0XHQgd2l0aCBhbiBlbiBkYXNoOyBpbmNsdWRpbmcgY2FzZXMgd2hlbiB0aGVyZSBpcyBhbiBleHRyYSBzcGFjZVxuXHRcdFx0XHRcdCBmcm9tIGVpdGhlciBvbmUgc2lkZSBvciBib3RoIHNpZGVzIG9mIHRoZSBkYXNoICovXG5cdHZhciBvcmRpbmFsX2luZGljYXRvciA9IFwiXCI7XG5cdHN3aXRjaCAobGFuZ3VhZ2UpIHtcblx0XHRjYXNlIFwicnVlXCI6XG5cdFx0Y2FzZSBcInNrXCI6XG5cdFx0Y2FzZSBcImNzXCI6XG5cdFx0XHRvcmRpbmFsX2luZGljYXRvciA9IFwiXFxcXC5cIjtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJlblwiOlxuXHRcdFx0b3JkaW5hbF9pbmRpY2F0b3IgPSBcInN0fG5kfHJkfHRoXCI7XG5cdFx0XHRicmVhaztcblx0fVxuXHRwYXR0ZXJuID0gXCIoXCIgKyBjYXJkaW5hbF9udW1iZXIgKyBcIikoXCIgKyBvcmRpbmFsX2luZGljYXRvciArIFwiKShbXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdP1tcIiArIGRhc2hlcyArIFwiXVtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl0/KShcIiArIGNhcmRpbmFsX251bWJlciArIFwiKShcIiArIG9yZGluYWxfaW5kaWNhdG9yICsgXCIpXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdpXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQy4oCTJDQkNVwiKTtcblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuZnVuY3Rpb24gcmVwbGFjZV9kYXNoX3dpdGhfaHlwaGVuKHN0cmluZyl7XG5cdHZhciBwYXR0ZXJuID0gXCIoW1wiKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgK1wiXSkoW+KAk+KAlF0pKFtcIisgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICtcIl0pXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEtJDNcIik7XG59XG5cblxuXG5cblxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qXFxcblx0Q29uc29saWRhdGlvbiBvZiBzcGFjZXNcblxcKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cblxuZnVuY3Rpb24gcmVtb3ZlX3NwYWNlX2JlZm9yZV9wdW5jdHVhdGlvbihzdHJpbmcpIHtcblx0dmFyIHBhdHRlcm4gPSBcIihbXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdKShbXCIgKyBjb25zdGFudHMuc2VudGVuY2VQdW5jdHVhdGlvbiArIGNvbnN0YW50cy5jbG9zaW5nQnJhY2tldHMgKyBjb25zdGFudHMuZGVncmVlICsgXCJdKVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKHJlLCBcIiQyXCIpO1xufVxuXG5cblxuZnVuY3Rpb24gcmVtb3ZlX3NwYWNlX2FmdGVyX3B1bmN0dWF0aW9uKHN0cmluZykge1xuXHR2YXIgcGF0dGVybiA9IFwiKFtcIiArIGNvbnN0YW50cy5vcGVuaW5nQnJhY2tldHMgKyBcIl0pKFtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl0pXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDFcIik7XG59XG5cblxuXG5mdW5jdGlvbiByZW1vdmVfdHJhaWxpbmdfc3BhY2VzKHN0cmluZykge1xuXHRyZXR1cm4gc3RyaW5nLnRyaW0oKTtcbn1cblxuXG5cbmZ1bmN0aW9uIGFkZF9zcGFjZV9iZWZvcmVfcHVuY3R1YXRpb24oc3RyaW5nKSB7XG5cdHZhciBwYXR0ZXJuID0gXCIoW1wiKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgKyBcIl0pKFtcIiArIGNvbnN0YW50cy5vcGVuaW5nQnJhY2tldHMgKyBcIl0pKFtcIisgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICsgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICsgXCJdKVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxICQyJDNcIik7XG59XG5cblxuXG5mdW5jdGlvbiBhZGRfc3BhY2VfYWZ0ZXJfcHVuY3R1YXRpb24oc3RyaW5nKSB7XG5cdHZhciBwYXR0ZXJuID0gXCIoW1wiKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgKyBcIl0pKFtcIiArIGNvbnN0YW50cy5zZW50ZW5jZVB1bmN0dWF0aW9uICsgY29uc3RhbnRzLmNsb3NpbmdCcmFja2V0cyArIFwiXSkoW1wiKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgKyBcIl0pXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEkMiAkM1wiKTtcbn1cblxuXG5cbi8qXG5cdFJlbW92ZXMgZXh0cmEgc3BhY2VzIGF0IHRoZSBiZWdpbm5pbmcgb2YgZWFjaCBwYXJhZ3JhcGhcblxuXHRUaGlzIGNvdWxkIGJlIGRvbmUgd2l0aCBhIG9uZS1saW5lcjpcblx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC9eXFxzKy9nbSwgXCJcIik7XG5cblx0SG93ZXZlciwgaXQgYWxzbyByZW1vdmVzIGVtcHR5IGxpbmVzLiBTaW5jZSwgd2Ugd2FudCB0byBoYW5kbGUgdGhpcyBjaGFuZ2Vcblx0c2VwYXJhdGVseSwgd2UgbmVlZCB0b1xuXHRbMV0gc3BsaXQgdGhlIGxpbmVzIG1hbnVhbGx5XG5cdFsyXSBhbmQgcmVtb3ZlIGV4dHJhIHNwYWNlcyBhdCB0aGUgYmVnaW5pbmcgb2YgZWFjaCBsaW5lXG5cdFszXSBqb2luIGxpbmVzIHRvZ2V0aGVyIHRvIGEgc2luZ2xlIHN0cmluZ1xuXG5cdEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG5cdEByZXR1cm5zIHtzdHJpbmd9IOKAlCBvdXRwdXQgd2l0aCByZW1vdmVkIHNwYWNlcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHBhcmFncmFwaHNcbiovXG5mdW5jdGlvbiByZW1vdmVfc3BhY2VzX2F0X3BhcmFncmFwaF9iZWdpbm5pbmcoc3RyaW5nKSB7XG5cdC8qIFsxXSBzcGxpdCB0aGUgbGluZXMgbWFudWFsbHkgKi9cblx0dmFyIGxpbmVzID0gc3RyaW5nLnNwbGl0KC9cXHI/XFxuLyk7XG5cblx0LyogWzJdIGFuZCByZW1vdmUgZXh0cmEgc3BhY2VzIGF0IHRoZSBiZWdpbmluZyBvZiBlYWNoIGxpbmUgKi9cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuXHRcdGxpbmVzW2ldID0gbGluZXNbaV0ucmVwbGFjZSgvXlxccysvLCBcIlwiKTtcblx0fVxuXG5cdC8qIFszXSBqb2luIGxpbmVzIHRvZ2V0aGVyIHRvIGEgc2luZ2xlIHN0cmluZyAqL1xuXHRyZXR1cm4gbGluZXMuam9pbihcIlxcblwiKTtcbn1cblxuXG5cbi8qXG5cdENvbnNvbGlkYXRlcyB0aGUgdXNlIG9mIG5vbi1icmVha2luZyBzcGFjZXNcblxuXHQqIHJlbW92ZXMgY2hhcmFjdGVycyBiZXR3ZWVuIG11bHRpLWNoYXJhY3RlciB3b3Jkc1xuXHQqIGFkZHMgbm9uLWJyZWFraW5nIHNwYWNlcyBhZnRlciBjYXJkaW5hbCBudW1iZXJzXG5cdCogYWRkcyBub24tYnJlYWtpbmcgc3BhY2VzIGFyb3VuZCDDl1xuXHQqIGFkZHMgbm9uLWJyZWFraW5nIHNwYWNlcyBhZnRlciBzaW5nbGUtY2hhcmFjdGVyIHByZXBvc2l0aW9uc1xuXG5cdEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG5cdEByZXR1cm5zIHtzdHJpbmd9IOKAlCBvdXRwdXQgd2l0aCBjb3JyZWN0bHkgcGxhY2VkIG5vbi1icmVha2luZyBzcGFjZVxuKi9cbmZ1bmN0aW9uIGNvbnNvbGlkYXRlX25ic3Aoc3RyaW5nKSB7XG5cblx0Ly8gcmVtb3ZlcyBub24tYnJlYWtpbmcgc3BhY2VzIGJldHdlZW4gbXVsdGktY2hhcmFjdGVyIHdvcmRzXG5cdHZhciBwYXR0ZXJuID0gXCIoW1wiKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgK1wiXXsyLH0pKFtcIisgY29uc3RhbnRzLm5ic3AgKyBjb25zdGFudHMubmFycm93TmJzcCArXCJdKShbXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArXCJdezIsfSlcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9ICBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSAkM1wiKTtcblx0c3RyaW5nID0gIHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxICQzXCIpOyAvL2NhbGxpbmcgaXQgdHdpY2UgdG8gY2F0Y2ggb2RkL2V2ZW4gb2NjdXJlbmNlc1xuXG5cblx0Ly8gYWRkcyBub24tYnJlYWtpbmcgc3BhY2VzIGFmdGVyIGNhcmRpbmFsIG51bWJlcnNcblx0cGF0dGVybiA9IFwiKFswLTldKykoICkoW1wiKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgK1wiXSspXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHZhciByZXBsYWNlbWVudCA9IFwiJDFcIiArIGNvbnN0YW50cy5uYnNwICsgXCIkM1wiO1xuXHRzdHJpbmcgPSAgc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblxuXG5cdC8vIGFkZHMgbm9uLWJyZWFraW5nIHNwYWNlcyBhcm91bmQgw5dcblx0cGF0dGVybiA9IFwiKFtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl0pKFvDl10pKFtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHJlcGxhY2VtZW50ID0gY29uc3RhbnRzLm5ic3AgKyBcIiQyXCIgKyBjb25zdGFudHMubmJzcDtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblxuXG5cdC8vIGFkZHMgbm9uLWJyZWFraW5nIHNwYWNlcyBhZnRlciBzaW5nbGUtY2hhcmFjdGVyIHByZXBvc2l0aW9uc1xuXHRwYXR0ZXJuID0gXCIoW8KgIF0pKFtcIiArIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArIFwiXXwmKSggKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRyZXBsYWNlbWVudCA9IFwiJDEkMlwiICsgY29uc3RhbnRzLm5ic3A7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7IC8vY2FsbGluZyBpdCB0d2ljZSB0byBjYXRjaCBvZGQvZXZlbiBvY2N1cmVuY2VzXG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cbi8qXG5cdENvcnJlY3RzIGltcHJvcGVyIHNwYWNpbmcgYXJvdW5kIGVsbGlwc2lzIGFuZCBhcG9zaW9wZXNpc1xuXG5cdEVsbGlwc2lzIChhcyBhIGNoYXJhY3RlcikgaXMgdXNlZCBmb3IgMiBkaWZmZXJlbnQgcHVycG9zZXM6XG5cdDEuIGFzIGFuIGVsbGlwc2lzIHRvIG9tbWl0IGEgcGllY2Ugb2YgaW5mb3JtYXRpb24gZGVsaWJlcmF0ZWx5XG5cdDIuIGFzIGFuIGFwb3Npb3Blc2lzOyBhIGZpZ3VyZSBvZiBzcGVlY2ggd2hlcmVpbiBhIHNlbnRlbmNlIGlzXG5cdGRlbGliZXJhdGVseSBicm9rZW4gb2ZmIGFuZCBsZWZ0IHVuZmluaXNoZWRcblxuXHRzb3VyY2VzXG5cdGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0VsbGlwc2lzXG5cdGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Fwb3Npb3Blc2lzXG5cdGh0dHA6Ly93d3cubGl0ZWVyYS5jei9zbG92bmlrL3Z5cHVzdGthXG5cblx0QWxnb3JpdGhtXG5cdEVsbGlwc2lzICYgQXBvc2lvcGVzaXMgcmVxdWlyZSBkaWZmZXJlbnQgdXNlIG9mIHNwYWNpbmcgYXJvdW5kIHRoZW0sXG5cdHRoYXQgaXMgd2h5IHdlIGFyZSBjb3JyZWN0aW5nIG9ubHkgZm9sbG93aW5nIGNhc2VzOlxuXHRlcnJvcnM6XG5cdFsxXSBjb3JyZWN0IHNwYWNpbmcsIHdoZW4gZWxsaXBzaXMgdXNlZCB1c2VkIGFyb3VuZCBjb21tYXNcblx0WzJdIGNvcnJlY3Qgc3BhY2luZyBmb3IgYXBvc2lvcGVzaXMgYXQgdGhlIGVuZCBvZiB0aGUgc2VudGVuY2UgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcGFyYWdyYXBoXG5cdFszXSBjb3JyZWN0IHNwYWNpbmcgZm9yIGFwb3Npb3Blc2lzIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHNlbnRlbmNlIGluIHRoZSBtaWRkbGUgb2YgdGhlIHBhcmFncmFwaFxuXHRbNF0gY29ycmVjdCBzcGFjaW5nIGZvciBhcG9zaW9wZXNpcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzZW50ZW5jZSBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBwYXJhZ3JhcGhcblx0WzVdIGNvcnJlY3Qgc3BhY2luZyBmb3IgYXBvc2lvcGVzaXMgYXQgdGhlIGVuZCBvZiB0aGUgc2VudGVuY2UgYXQgdGhlIGVuZCBvZiB0aGUgcGFyYWdyYXBoXG5cblx0QHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cblx0QHJldHVybnMge3N0cmluZ30g4oCUIG91dHB1dCB3aXRoIGNvcnJlY3RlZCBzcGFjaW5nIGFyb3VuZCBhcG9zaW9wZXNpc1xuKi9cbmZ1bmN0aW9uIGNvcnJlY3Rfc3BhY2VzX2Fyb3VuZF9lbGxpcHNpcyhzdHJpbmcpIHtcblxuXHQvKiBbMV0gY29ycmVjdCBzcGFjaW5nLCB3aGVuIGVsbGlwc2lzIHVzZWQgdXNlZCBhcm91bmQgY29tbWFzICovXG5cdHZhciBwYXR0ZXJuID0gXCIsW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXT9cIiArIGNvbnN0YW50cy5lbGxpcHNpcyArIFwiW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXT8sXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIsIOKApixcIik7XG5cblxuXHQvKiBbMl0gY29ycmVjdCBzcGFjaW5nIGZvciBhcG9zaW9wZXNpcyBhdCB0aGUgZW5kIG9mIHRoZSBzZW50ZW5jZVxuXHRcdFx0XHQgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcGFyYWdyYXBoICovXG5cdHBhdHRlcm4gPSBcIihbXCIgKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgKyBcIl0pKFtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl0pKFwiICsgY29uc3RhbnRzLmVsbGlwc2lzICsgXCJbXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdW1wiICsgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICsgXCJdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQzXCIpO1xuXG5cblx0LyogWzNdIGNvcnJlY3Qgc3BhY2luZyBmb3IgYXBvc2lvcGVzaXMgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgc2VudGVuY2Vcblx0XHRcdFx0IGluIHRoZSBtaWRkbGUgb2YgdGhlIHBhcmFncmFwaCAqL1xuXHRwYXR0ZXJuID0gXCIoW1wiICsgY29uc3RhbnRzLnNlbnRlbmNlUHVuY3R1YXRpb24gKyBcIl1bXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdXCIgKyBjb25zdGFudHMuZWxsaXBzaXMgK1wiKShbXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdKShbXCIgKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgK1wiXSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEkM1wiKTtcblxuXG5cdC8qIFs0XSBjb3JyZWN0IHNwYWNpbmcgZm9yIGFwb3Npb3Blc2lzIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHNlbnRlbmNlXG5cdFx0XHRcdCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBwYXJhZ3JhcGggKi9cblx0cGF0dGVybiA9IFwiKF7igKYpKFtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl0pKFtcIiArIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArIFwiXSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ21cIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDNcIik7XG5cblxuXHQvKiBbNV0gY29ycmVjdCBzcGFjaW5nIGZvciBhcG9zaW9wZXNpcyBhdCB0aGUgZW5kIG9mIHRoZSBzZW50ZW5jZVxuXHRcdFx0XHQgYXQgdGhlIGVuZCBvZiB0aGUgcGFyYWdyYXBoICovXG5cdHBhdHRlcm4gPSBcIihbXCIgKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgKyBjb25zdGFudHMuc2VudGVuY2VQdW5jdHVhdGlvbiArIFwiXSkoW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXSkoXCIgKyBjb25zdGFudHMuZWxsaXBzaXMgKyBcIikoPyFbIFwiICsgY29uc3RhbnRzLnNlbnRlbmNlUHVuY3R1YXRpb24gKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgKyBcIl0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDNcIik7XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cbi8qXG5cdENvcnJlY3RzIGFjY2lkZW50YWwgdXBwZXJjYXNlXG5cblx0QmVzdC1lZmZvcnQgZnVuY3Rpb24gdG8gZml4IG1vc3QgY29tbW9uIGFjY2lkZW50YWwgdXBwZXJjYXNlIGVycm9ycywgbmFtZWx5OlxuXHRbMV0gMiBmaXJzdCB1cHBlcmNhc2UgbGV0dGVycyAoaWUuIFVQcGVyY2FzZSlcblx0WzJdIFN3YXBwZWQgY2FzZXMgKGllLiB1UFBFUkNBU0UpXG5cblx0QWxnb3JpdGhtIGRvZXMgbm90IGZpeCBvdGhlciB1cHBlcmNhc2UgZXZlbnR1YWxpdGllcyxcblx0ZS5nLiBtaXhlZCBjYXNlIChVcHBFUmNhU2UpIGFzIHRoZXJlIGFyZSBtYW55IGNhc2VzIGZvciBjb3Jwb3JhdGUgYnJhbmRzXG5cdHRoYXQgY291bGQgcG90ZW50aWFsbHkgbWF0Y2ggdGhlIGFsZ29yaXRobSBhcyBmYWxzZSBwb3NpdGl2ZS5cblxuXHRAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcmV0dXJucyB7c3RyaW5nfSDigJQgb3V0cHV0IHdpdGggY29ycmVjdGVkIGFjY2lkZW50YWwgdXBwZXJjYXNlXG4qL1xuZnVuY3Rpb24gY29ycmVjdF9hY2NpZGVudGFsX3VwcGVyY2FzZShzdHJpbmcpIHtcblxuXHQvKiBbMV0gdHdvIGZpcnN0IHVwcGVyY2FzZSBsZXR0ZXJzIChpLmUuIFVQcGVyY2FzZSkgKi9cblx0dmFyIHBhdHRlcm4gPSBcIltcIisgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICtcIl17MiwyfVtcIisgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICtcIl0rXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgZnVuY3Rpb24oc3RyaW5nKXtcblx0XHRyZXR1cm4gKHN0cmluZy5zdWJzdHJpbmcoMCwxKSArIHN0cmluZy5zdWJzdHJpbmcoMSkudG9Mb3dlckNhc2UoKSk7XG5cdH0pO1xuXG5cdC8qIFsyLjFdIFN3YXBwZWQgY2FzZXMgKDItbGV0dGVyIGNhc2VzLCBpLmUuIGlUKVxuXHRcdFx0Tm90ZSB0aGF0IHRoaXMgaXMgZGl2aWRlZCBpbnRvIDIgc2VwYXJhdGUgY2FzZXMgYXMgXFxiIGluIEphdmFTY3JpcHQgcmVnZXhcblx0XHRcdGRvZXMgbm90IHRha2Ugbm9uLWxhdGluIGNoYXJhY3RlcnMgaW50byBhIGNvc25pZGVyYXRpb25cblx0Ki9cblx0cGF0dGVybiA9IFwiW1wiKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgK1wiXVtcIisgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICtcIl1cXFxcYlwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgZnVuY3Rpb24oc3RyaW5nKXtcblx0XHRyZXR1cm4gKHN0cmluZy5zdWJzdHJpbmcoMCwxKSArIHN0cmluZy5zdWJzdHJpbmcoMSkudG9Mb3dlckNhc2UoKSk7XG5cdH0pO1xuXG5cdC8qIFsyLjJdIFN3YXBwZWQgY2FzZXMgKG4tbGV0dGVyIGNhc2VzLCBpLmUuIHVQUEVSQ0FTRSkgKi9cblx0cGF0dGVybiA9IFwiW1wiKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgK1wiXStbXCIrIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArXCJdezIsfVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgZnVuY3Rpb24oc3RyaW5nKXtcblx0XHRyZXR1cm4gKHN0cmluZy5zdWJzdHJpbmcoMCwxKSArIHN0cmluZy5zdWJzdHJpbmcoMSkudG9Mb3dlckNhc2UoKSk7XG5cdH0pO1xuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG5cblxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qXFxcblx0QWJicmV2aWF0aW9uc1xuXFwqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKlxuXHRJZGVudGlmaWVzIGRpZmZlcmVudGx5LXNwZWxsZWQgYWJicmV2aWF0aW9ucyBhbmQgcmVwbGFjZXMgaXQgd2l0aFxuXHRhIHRlbXAgdmFyaWFibGUsIHt7dHlwb3BvX19bYWJicl19fVxuXG5cdElkZW50aWZpZXMgZ2l2ZW4gYWJicmV2aWF0aW9uczpcblx0YS5tLiwgcC5tLiwgZS5nLiwgaS5lLlxuXG5cdEFsZ29yaXRobVxuXHRbMV0gSWRlbnRpZnkgZS5nLiwgaS5lLlxuXHRbMl0gSWRlbnRpZnkgYS5tLiwgcC5tLiAoZGlmZmVyZW50IG1hdGNoIHRvIGF2b2lkIGZhbHNlIHBvc2l0aXZlcyBzdWNoIGFzOlxuXHRcdFx0SSBhbSwgSGUgaXMgdGhlIFBNLilcblx0WzNdIEV4Y2x1ZGUgZmFsc2UgaWRlbnRpZmljYXRpb25zXG5cblx0QHBhcmFtIHtzdHJpbmd9IGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG5cdEByZXR1cm5zIHtzdHJpbmd9IGNvcnJlY3RlZCBvdXRwdXRcbiovXG5mdW5jdGlvbiBpZGVudGlmeV9jb21tb25fYWJicmV2aWF0aW9ucyhzdHJpbmcpIHtcblxuXHQvKiBbMV0gSWRlbnRpZnkgZS5nLiwgaS5lLiAqL1xuXHR2YXIgYWJicmV2aWF0aW9ucyA9IFtcImVnXCIsIFwiaWVcIl07XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYWJicmV2aWF0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBwYXR0ZXJuID0gXCIoXFxcXGJbXCIgKyBhYmJyZXZpYXRpb25zW2ldWzBdICsgXCJdXFxcXC4/W1wiKyBjb25zdGFudHMuc3BhY2VzICtcIl0/W1wiICsgYWJicmV2aWF0aW9uc1tpXVsxXSArIFwiXVxcXFwuPykoW1wiKyBjb25zdGFudHMuc3BhY2VzICtcIl0/KShcXFxcYilcIjtcblx0XHQvLyBjb25zb2xlLmxvZyhwYXR0ZXJuKTtcblx0XHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ2lcIik7XG5cdFx0dmFyIHJlcGxhY2VtZW50ID0gXCJ7e3R5cG9wb19fXCIgKyBhYmJyZXZpYXRpb25zW2ldICsgXCJ9fSBcIjtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXHR9XG5cblxuXG5cblx0LyogWzJdIElkZW50aWZ5IGEubS4sIHAubS4gKi9cblx0YWJicmV2aWF0aW9ucyA9IFtcImFtXCIsIFwicG1cIl07XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYWJicmV2aWF0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBwYXR0ZXJuID0gXCIoXFxcXGQpKFtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl0/KShcXFxcYltcIiArIGFiYnJldmlhdGlvbnNbaV1bMF0gKyBcIl1cXFxcLj9bXCIrIGNvbnN0YW50cy5zcGFjZXMgK1wiXT9bXCIgKyBhYmJyZXZpYXRpb25zW2ldWzFdICsgXCJdXFxcXC4/KShbXCIrIGNvbnN0YW50cy5zcGFjZXMgK1wiXT8pKFxcXFxifFxcXFxCKVwiO1xuXHRcdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnaVwiKTtcblx0XHRyZXBsYWNlbWVudCA9IFwiJDEge3t0eXBvcG9fX1wiICsgYWJicmV2aWF0aW9uc1tpXSArIFwifX0gXCI7XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblx0fVxuXG5cblx0LyogWzNdIEV4Y2x1ZGUgZmFsc2UgaWRlbnRpZmljYXRpb25zXG5cdFx0IFJlZ2V4IFxcYiBkb2VzIG5vdCBjYXRjaCBub24tbGF0aW4gY2hhcmFjdGVycyBzbyB3ZSBuZWVkIHRvIGV4Y2x1ZGUgZmFsc2Vcblx0XHQgaWRlbnRpZmljYXRpb25zXG5cdCovXG5cdGFiYnJldmlhdGlvbnMgPSBbXCJlZ1wiLCBcImllXCIsIFwiYW1cIiwgXCJwbVwiXTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhYmJyZXZpYXRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0Ly8gbm9uLWxhdGluIGNoYXJhY3RlciBhdCB0aGUgYmVnaW5uaW5nXG5cdFx0dmFyIHBhdHRlcm4gPSBcIihbXCIgKyBjb25zdGFudHMubm9uTGF0aW5DaGFycyArIFwiXSkoe3t0eXBvcG9fX1wiICsgYWJicmV2aWF0aW9uc1tpXSArIFwifX0pXCI7XG5cdFx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdFx0cmVwbGFjZW1lbnQgPSBcIiQxXCIgKyBhYmJyZXZpYXRpb25zW2ldO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG5cblx0XHQvLyBub24tbGF0aW4gY2hhcmFjdGVyIGF0IHRoZSBlbmRcblx0XHRwYXR0ZXJuID0gXCIoe3t0eXBvcG9fX1wiICsgYWJicmV2aWF0aW9uc1tpXSArIFwifX0gKShbXCIgKyBjb25zdGFudHMubm9uTGF0aW5DaGFycyArIFwiXSlcIjtcblx0XHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRcdHJlcGxhY2VtZW50ID0gYWJicmV2aWF0aW9uc1tpXSArIFwiJDJcIjtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cbi8qXG5cdFJlcGxhY2VzIGlkZW50aWZpZWQgdGVtcCBhYmJyZXZpYXRpb24gdmFyaWFibGUgbGlrZSB7e3R5cG9wb19fZWd9fSxcblx0d2l0aCB0aGVpciBhY3R1YWwgcmVwcmVzZW50YXRpb25cblxuXHRAcGFyYW0ge3N0cmluZ30gaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cblx0QHJldHVybnMge3N0cmluZ30gY29ycmVjdGVkIG91dHB1dFxuKi9cbmZ1bmN0aW9uIHBsYWNlX2NvbW1vbl9hYmJyZXZpYXRpb25zKHN0cmluZykge1xuXHR2YXIgYWJicmV2aWF0aW9ucyA9IFtcImVnXCIsIFwiaWVcIiwgXCJhbVwiLCBcInBtXCJdO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFiYnJldmlhdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgcGF0dGVybiA9IFwie3t0eXBvcG9fX1wiICsgYWJicmV2aWF0aW9uc1tpXSArIFwifX1cIjtcblx0XHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0XHR2YXIgcmVwbGFjZW1lbnQgPSBhYmJyZXZpYXRpb25zW2ldWzBdICsgXCIuXCIgKyBhYmJyZXZpYXRpb25zW2ldWzFdICsgXCIuXCI7XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblx0fVxuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG5cblxuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSpcXFxuXHRFeGNlcHRpb25zXG5cXCotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXG4vKlxuXHRJZGVudGlmaWVzIGV4Y2VwdGlvbnMgdGhhdCB3aWxsIGJlIG9tbWl0ZWQgZnJvbSBjb3JyZWN0aW9uIG9mIGFueSBzb3J0XG5cblx0QWxnb3JpdGhtXG5cdFsxXSBJZGVudGlmeSBlbWFpbCBhZHJlc3Nlc1xuXHRbMl0gSWRlbnRpZnkgd2ViIFVSTHMgYW5kIElQc1xuXHRbM10gTWFyayB0aGVtIGFzIHRlbXBvcmFyeSBleGNlcHRpb25zIGluIGZvcm1hdCB7e3R5cG9wb19fZXhjZXB0aW9uLVtpXX19XG5cblx0QHBhcmFtIHtzdHJpbmd9IGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uIG9mIGV4Y2VwdGlvbnNcblx0QHJldHVybnMge3N0cmluZ30g4oCUIG91dHB1dCB3aXRoIGlkZW50aWZpZWQgZXhjZXB0aW9ucyBpbiBmb3JtYXQge3t0eXBvcG9fX2V4Y2VwdGlvbi1baV19fVxuKi9cbmZ1bmN0aW9uIGlkZW50aWZ5X2V4Y2VwdGlvbnMoc3RyaW5nKSB7XG5cblx0LyogWzFdIElkZW50aWZ5IGVtYWlsIGFkcmVzc2VzICovXG5cdGlkZW50aWZ5X2V4Y2VwdGlvbl9zZXQoc3RyaW5nLCBjb25zdGFudHMuZW1haWxBZGRyZXNzUGF0dGVybik7XG5cblxuXHQvKiBbMl0gSWRlbnRpZnkgd2ViIFVSTHMgYW5kIElQcyAqL1xuXHRpZGVudGlmeV9leGNlcHRpb25fc2V0KHN0cmluZywgY29uc3RhbnRzLndlYlVybFBhdHRlcm4pO1xuXG5cblx0LyogWzNdIE1hcmsgdGhlbSBhcyB0ZW1wb3JhcnkgZXhjZXB0aW9ucyBpbiBmb3JtYXQge3t0eXBvcG9fX2V4Y2VwdGlvbi1baV19fSAqL1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGV4Y2VwdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgcmVwbGFjZW1lbnQgPSBcInt7dHlwb3BvX19leGNlcHRpb24tXCIgKyBpICsgXCJ9fVwiO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKGV4Y2VwdGlvbnNbaV0sIHJlcGxhY2VtZW50KTtcblx0fVxuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG4vKlxuXHRJZGVudGlmaWVzIHNldCBvZiBleGNlcHRpb25zIGZvciBnaXZlbiBwYXR0ZXJuXG5cdFVzZWQgYXMgaGVscGVyIGZ1bmN0aW9uIGZvciBpZGVudGlmeV9leGNlcHRpb25zKHN0cmluZylcblxuXHRAcGFyYW0ge3N0cmluZ30gaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb24gb2YgZXhjZXB0aW9uc1xuXHRAcGFyYW0ge3BhdHRlcm59IHJlZ3VsYXIgZXhwcmVzc2lvbiBwYXR0ZXJuIHRvIG1hdGNoIGV4Y2VwdGlvblxuKi9cbmZ1bmN0aW9uIGlkZW50aWZ5X2V4Y2VwdGlvbl9zZXQoc3RyaW5nLCBwYXR0ZXJuKSB7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHR2YXIgbWF0Y2hlZF9leGNlcHRpb25zID0gc3RyaW5nLm1hdGNoKHJlKTtcblx0aWYgKG1hdGNoZWRfZXhjZXB0aW9ucyAhPSBudWxsKSB7XG5cdFx0ZXhjZXB0aW9ucyA9IGV4Y2VwdGlvbnMuY29uY2F0KG1hdGNoZWRfZXhjZXB0aW9ucyk7XG5cdH1cbn1cblxuXG5cbi8qXG5cdFJlcGxhY2VzIGlkZW50aWZpZWQgZXhjZXB0aW9ucyB3aXRoIHJlYWwgb25lcyBieSBjaGFuZ2UgdGhlaXJcblx0dGVtcG9yYXJ5IHJlcHJlc2VudGF0aW9uIGluIGZvcm1hdCB7e3R5cG9wb19fZXhjZXB0aW9uLVtpXX19IHdpdGggaXRzXG5cdGNvcnJlc3BvbmRpbmcgcmVwcmVzZW50YXRpb25cblxuXHRAcGFyYW0ge3N0cmluZ30gaW5wdXQgdGV4dCB3aXRoIGlkZW50aWZpZWQgZXhjZXB0aW9uc1xuXHRAcmV0dXJucyB7c3RyaW5nfSBvdXRwdXQgd2l0aCBwbGFjZWQgZXhjZXB0aW9uc1xuKi9cbmZ1bmN0aW9uIHBsYWNlX2V4Y2VwdGlvbnMoc3RyaW5nKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZXhjZXB0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBwYXR0ZXJuID0gXCJ7e3R5cG9wb19fZXhjZXB0aW9uLVwiICsgaSArIFwifX1cIlxuXHRcdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRcdHZhciByZXBsYWNlbWVudCA9IGV4Y2VwdGlvbnNbaV07XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblx0fVxuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG5cblxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qXFxcblx0TWFpbiBzY3JpcHRcblxcKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cblxuLypcblx0Q29ycmVjdCB0eXBvcyBpbiB0aGUgcHJlZGVmaW5lZCBvcmRlclxuXG5cblx0QHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgY29ycmVjdGlvblxuXHRAcGFyYW0ge2xhbmd1YWdlfSBzdHJpbmcg4oCUIGxhbmd1YWdlIG9wdGlvbiB0byBjb3JyZWN0IHNwZWNpZmljIHR5cG9zOyBzdXBwb3J0ZWQgbGFuZ3VhZ2VzOiBlbiwgc2ssIGNzLCBydWUuIGlmIG5vdCBzcGVjaWZpZWQsIEVuZ2xpc2ggdHlwb3MgYXJlIGNvcnJlY3RlZFxuXHRAcGFyYW0ge3JlbW92ZV9saW5lc30gYm9vbGVhbiDigJQgb3B0aW9uYWwgcGFyYW1ldGVyIGFsbG93aW5nIHlvdSB0byBjaG9vc2Ugd2hldGhlciB0byByZW1vdmUgZW1wdHkgbGluZXMgb3Igbm90XG5cdEByZXR1cm5zIHtzdHJpbmd9IOKAlCBjb3JyZWN0ZWQgb3V0cHV0XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcnJlY3RfdHlwb3Moc3RyaW5nLCBsYW5ndWFnZSwgY29uZmlndXJhdGlvbikge1xuXHRsYW5ndWFnZSA9ICh0eXBlb2YgbGFuZ3VhZ2UgPT09IFwidW5kZWZpbmVkXCIpID8gXCJlblwiIDogbGFuZ3VhZ2U7XG5cblx0Y29uZmlndXJhdGlvbiA9ICh0eXBlb2YgY29uZmlndXJhdGlvbiA9PT0gXCJ1bmRlZmluZWRcIikgPyB7XG5cdFx0cmVtb3ZlTGluZXMgOiB0cnVlLFxuXHR9IDogY29uZmlndXJhdGlvbjtcblxuXHRzdHJpbmcgPSBpZGVudGlmeV9leGNlcHRpb25zKHN0cmluZyk7XG5cdHN0cmluZyA9IGlkZW50aWZ5X2NvbW1vbl9hYmJyZXZpYXRpb25zKHN0cmluZyk7IC8vIG5lZWRzIHRvIGdvIGJlZm9yZSBwdW5jdHVhdGlvbiBmaXhlc1xuXG5cdHN0cmluZyA9IHJlcGxhY2VTeW1ib2xzKHN0cmluZyk7XG5cdHN0cmluZyA9IHJlcGxhY2VfcGVyaW9kc193aXRoX2VsbGlwc2lzKHN0cmluZyk7XG5cdHN0cmluZyA9IHJlbW92ZV9tdWx0aXBsZV9zcGFjZXMoc3RyaW5nKTtcblxuXG5cdHN0cmluZyA9IGNvcnJlY3RfZG91YmxlX3F1b3Rlc19hbmRfcHJpbWVzKHN0cmluZywgbGFuZ3VhZ2UpO1xuXHRzdHJpbmcgPSBjb3JyZWN0X3NpbmdsZV9xdW90ZXNfcHJpbWVzX2FuZF9hcG9zdHJvcGhlcyhzdHJpbmcsIGxhbmd1YWdlKTtcblxuXHRzdHJpbmcgPSBjb3JyZWN0X211bHRpcGxlX3NpZ24oc3RyaW5nKTtcblxuXHRzdHJpbmcgPSByZW1vdmVfc3BhY2VfYmVmb3JlX3B1bmN0dWF0aW9uKHN0cmluZyk7XG5cdHN0cmluZyA9IHJlbW92ZV9zcGFjZV9hZnRlcl9wdW5jdHVhdGlvbihzdHJpbmcpO1xuXHRzdHJpbmcgPSByZW1vdmVfdHJhaWxpbmdfc3BhY2VzKHN0cmluZyk7XG5cdHN0cmluZyA9IGFkZF9zcGFjZV9iZWZvcmVfcHVuY3R1YXRpb24oc3RyaW5nKTtcblx0c3RyaW5nID0gYWRkX3NwYWNlX2FmdGVyX3B1bmN0dWF0aW9uKHN0cmluZyk7XG5cdHN0cmluZyA9IHJlbW92ZV9zcGFjZXNfYXRfcGFyYWdyYXBoX2JlZ2lubmluZyhzdHJpbmcpO1xuXG5cdGlmKGNvbmZpZ3VyYXRpb24ucmVtb3ZlTGluZXMpIHtcblx0XHRzdHJpbmcgPSByZW1vdmVFbXB0eUxpbmVzKHN0cmluZyk7XG5cdH1cblxuXHRzdHJpbmcgPSBjb25zb2xpZGF0ZV9uYnNwKHN0cmluZyk7XG5cdHN0cmluZyA9IGNvcnJlY3Rfc3BhY2VzX2Fyb3VuZF9lbGxpcHNpcyhzdHJpbmcpO1xuXG5cdHN0cmluZyA9IHJlcGxhY2VfaHlwaGVuX3dpdGhfZGFzaChzdHJpbmcsIGxhbmd1YWdlKTtcblx0c3RyaW5nID0gcmVwbGFjZV9kYXNoX3dpdGhfaHlwaGVuKHN0cmluZyk7XG5cblx0c3RyaW5nID0gY29ycmVjdF9hY2NpZGVudGFsX3VwcGVyY2FzZShzdHJpbmcpO1xuXG5cdHN0cmluZyA9IHBsYWNlX2NvbW1vbl9hYmJyZXZpYXRpb25zKHN0cmluZyk7IC8vIG5lZWRzIHRvIGdvIGFmdGVyIHB1bmN0dWF0aW9uIGZpeGVzXG5cdHN0cmluZyA9IHBsYWNlX2V4Y2VwdGlvbnMoc3RyaW5nKTtcblxuXHRzdHJpbmcgPSByZXBsYWNlX3BlcmlvZHNfd2l0aF9lbGxpcHNpcyhzdHJpbmcpO1xuXG5cdHJldHVybiBzdHJpbmc7XG59XG4iXX0=

//# sourceMappingURL=maps/typopo.built.js.map
