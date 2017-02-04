(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typopo = require('./typopo');

window.correct_typos = _typopo.correct_typos;

},{"./typopo":5}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{"./lib/constants":2,"./lib/empty-lines":3,"./lib/symbol-replacements":4}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGJyb3dzZXJfdHlwb3BvLmpzIiwic3JjXFxsaWJcXGNvbnN0YW50cy5qcyIsInNyY1xcbGliXFxlbXB0eS1saW5lcy5qcyIsInNyY1xcbGliXFxzeW1ib2wtcmVwbGFjZW1lbnRzLmpzIiwic3JjXFx0eXBvcG8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUVBLE9BQU8sYUFBUDs7Ozs7Ozs7QUNGQTs7OztBQUtBLElBQU0sb0JBQW9CLDhEQUExQjtBQUNBLElBQU0sb0JBQW9CLDhEQUExQjtBQUNBLElBQU0sZ0JBQWdCLG9CQUFvQixpQkFBMUM7QUFDQSxJQUFNLGlCQUFpQixRQUFRLGlCQUEvQjtBQUNBLElBQU0saUJBQWlCLFFBQVEsaUJBQS9CO0FBQ0EsSUFBTSxXQUFXLGlCQUFpQixjQUFsQztBQUNBOzs7Ozs7Ozs7O0FBVUEsSUFBTSxvQkFBb0IsbUJBQTFCO0FBQ0EsSUFBTSxvQkFBb0IsMERBQTFCO0FBQ0EsSUFBTSxRQUFRLEdBQWQ7QUFDQSxJQUFNLE9BQU8sR0FBYjtBQUNBLElBQU0sWUFBWSxHQUFsQixDLENBQXVCO0FBQ3ZCLElBQU0sYUFBYSxHQUFuQixDLENBQXdCO0FBQ3hCLElBQU0sU0FBUyxRQUFRLElBQVIsR0FBZSxTQUFmLEdBQTJCLFVBQTFDO0FBQ0EsSUFBTSxzQkFBc0IsUUFBNUI7QUFDQSxJQUFNLHNCQUFzQixXQUFXLG1CQUF2QyxDLENBQTREO0FBQzVELElBQU0sa0JBQWtCLFdBQXhCO0FBQ0EsSUFBTSxrQkFBa0IsV0FBeEI7QUFDQSxJQUFNLFdBQVcsR0FBakI7QUFDQSxJQUFNLFNBQVMsR0FBZjs7QUFFQTs7OztBQUlBLElBQU0sZ0JBQWdCLCtGQUNwQiwyRUFEb0IsR0FFcEIsNkVBRm9CLEdBR3BCLDZDQUhvQixHQUc2QjtBQUNqRCxLQUpvQixHQUlaO0FBQ1IsMENBTG9CLEdBTXBCLGlDQU5vQixHQU9w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Q0FBVDtBQUNBOztBQUVELFVBQVMsaUJBQWlCLE1BQWpCLENBQVQ7QUFDQSxVQUFTLCtCQUErQixNQUEvQixDQUFUOztBQUVBLFVBQVMseUJBQXlCLE1BQXpCLEVBQWlDLFFBQWpDLENBQVQ7QUFDQSxVQUFTLHlCQUF5QixNQUF6QixDQUFUOztBQUVBLFVBQVMsNkJBQTZCLE1BQTdCLENBQVQ7O0FBRUEsVUFBUywyQkFBMkIsTUFBM0IsQ0FBVCxDQXZDOEQsQ0F1Q2pCO0FBQzdDLFVBQVMsaUJBQWlCLE1BQWpCLENBQVQ7O0FBRUEsVUFBUyw4QkFBOEIsTUFBOUIsQ0FBVDs7QUFFQSxRQUFPLE1BQVA7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBjb3JyZWN0X3R5cG9zIH0gZnJvbSAnLi90eXBvcG8nO1xuXG53aW5kb3cuY29ycmVjdF90eXBvcyA9IGNvcnJlY3RfdHlwb3M7XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qXFxcbiBWYXJpYWJsZXMgJiBDaGFyYWN0ZXIgcmVwbGFjZW1lbnQgc2V0c1xuXFwqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblxuY29uc3Qgbm9uTGF0aW5Mb3dlcmNhc2UgPSBcIsOhw6TEjcSPw6nEm8OtxLrEvsWIw7PDtMO2xZHFlcWZxaHFpcO6w7zFscWvw73FvtCw0LHQstCz0pHQtNC10LfRltC40LnQutC70LzQvdC+0L/RgNGB0YLRg9GE0YrRi9GM0YbRh9C20YjRl9GJ0ZHRlNGO0Y/RhVwiO1xuY29uc3Qgbm9uTGF0aW5VcHBlcmNhc2UgPSBcIsOBw4TEjMSOw4nEmsONxLnEvcWHw5PDlMOWxZDFlMWYxaDFpMOaw5zFsMWuw53FvdCQ0JHQktCT0pDQlNCV0JfQhtCY0JnQmtCb0JzQndCe0J/QoNCh0KLQo9Ck0KrQq9Cs0KbQp9CW0KjQh9Cp0IHQhNCu0K/QpVwiO1xuY29uc3Qgbm9uTGF0aW5DaGFycyA9IG5vbkxhdGluTG93ZXJjYXNlICsgbm9uTGF0aW5VcHBlcmNhc2U7XG5jb25zdCBsb3dlcmNhc2VDaGFycyA9IFwiYS16XCIgKyBub25MYXRpbkxvd2VyY2FzZTtcbmNvbnN0IHVwcGVyY2FzZUNoYXJzID0gXCJBLVpcIiArIG5vbkxhdGluVXBwZXJjYXNlO1xuY29uc3QgYWxsQ2hhcnMgPSBsb3dlcmNhc2VDaGFycyArIHVwcGVyY2FzZUNoYXJzO1xuLypcbiAoMzkpXHRcdFx0ZHVtYiBzaW5nbGUgcXVvdGVcbiAoODIxNilcdFx0bGVmdCBzaW5nbGUgcXVvdGF0aW9uIG1hcmtcbiAoODIxNylcdFx0cmlnaHQgc2luZ2xlIHF1b3RhdGlvbiBtYXJrXG4gKDcwMClcdFx0bW9kaWZpZXIgbGV0dGVyIGFwb3N0cm9waGU7IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01vZGlmaWVyX2xldHRlcl9hcG9zdHJvcGhlXG4gKDgyMTkpXHRcdHNpbmdsZSBoaWdoLXJldmVyc2VkLTkgcXVvdGF0aW9uIG1hcmtcbiAoODI0MilcdFx0cHJpbWVcbiAoODI0OSlcdFx0c2luZ2xlIGxlZnQtcG9pbnRpbmcgYW5nbGUgcXVvdGF0aW9uIG1hcmtcbiAoODI1MClcdFx0c2luZ2xlIHJpZ2h0LXBvaW50aW5nIGFuZ2xlIHF1b3RhdGlvbiBtYXJrXG4gKi9cbmNvbnN0IHNpbmdsZVF1b3RlQWRlcHRzID0gXCLigJp8J3zigJh84oCZfMq8fOKAm3zigLJ84oC5fOKAulwiO1xuY29uc3QgZG91YmxlUXVvdGVBZGVwdHMgPSBcIuKAnnzigJx84oCdfFxcXCJ8wqt8wrt84oCzfCx7Mix9fOKAmHsyLH184oCZezIsfXwnezIsfXzigLl7Mix9fOKAunsyLH184oCyezIsfVwiO1xuY29uc3Qgc3BhY2UgPSBcIiBcIjtcbmNvbnN0IG5ic3AgPSBcIsKgXCI7XG5jb25zdCBoYWlyU3BhY2UgPSBcIuKAilwiOyAvLyYjODIwMjtcbmNvbnN0IG5hcnJvd05ic3AgPSBcIuKAr1wiOyAvLyYjODIzOTtcbmNvbnN0IHNwYWNlcyA9IHNwYWNlICsgbmJzcCArIGhhaXJTcGFjZSArIG5hcnJvd05ic3A7XG5jb25zdCB0ZXJtaW5hbFB1bmN0dWF0aW9uID0gXCJcXC5cXCFcXD9cIjtcbmNvbnN0IHNlbnRlbmNlUHVuY3R1YXRpb24gPSBcIlxcLFxcOlxcO1wiICsgdGVybWluYWxQdW5jdHVhdGlvbjsgLy8gdGhlcmUgaXMgbm8gZWxsaXBzaXMgaW4gdGhlIHNldCBhcyBpdCBpcyBiZWluZyB1c2VkIHRocm91Z2hvdXQgYSBzZW50ZW5jZSBpbiB0aGUgbWlkZGxlLiBSZXRoaW5rIHRoaXMgZ3JvdXAgdG8gc3BsaXQgaXQgaW50byBlbmQtc2VudGVuY2UgcHVuY3R1YXRpb24gYW5kIG1pZGRsZSBzZW50ZW5jZSBwdW5jdHVhdGlvblxuY29uc3Qgb3BlbmluZ0JyYWNrZXRzID0gXCJcXFxcKFxcXFxbXFxcXHtcIjtcbmNvbnN0IGNsb3NpbmdCcmFja2V0cyA9IFwiXFxcXClcXFxcXVxcXFx9XCI7XG5jb25zdCBlbGxpcHNpcyA9IFwi4oCmXCI7XG5jb25zdCBkZWdyZWUgPSBcIsKwXCI7XG5cbi8qXG4gU291cmNlIGZvciB3ZWJVcmxQYXR0ZXJuLCBlbWFpbEFkZHJlc3NQYXR0ZXJuXG4gaHR0cDovL2dyZXBjb2RlLmNvbS9maWxlL3JlcG9zaXRvcnkuZ3JlcGNvZGUuY29tL2phdmEvZXh0L2NvbS5nb29nbGUuYW5kcm9pZC9hbmRyb2lkLzIuMF9yMS9hbmRyb2lkL3RleHQvdXRpbC9SZWdleC5qYXZhI1JlZ2V4LjBXRUJfVVJMX1BBVFRFUk5cbiAqL1xuY29uc3Qgd2ViVXJsUGF0dGVybiA9IFwiKCg/OihodHRwfGh0dHBzfEh0dHB8SHR0cHN8cnRzcHxSdHNwKTpcXFxcL1xcXFwvKD86KD86W2EtekEtWjAtOVxcXFwkXFxcXC1cXFxcX1xcXFwuXFxcXCtcXFxcIVxcXFwqXFxcXCdcXFxcKFxcXFwpXCIgK1xuICBcIlxcXFwsXFxcXDtcXFxcP1xcXFwmXFxcXD1dfCg/OlxcXFwlW2EtZkEtRjAtOV17Mn0pKXsxLDY0fSg/OlxcXFw6KD86W2EtekEtWjAtOVxcXFwkXFxcXC1cXFxcX1wiICtcbiAgXCJcXFxcLlxcXFwrXFxcXCFcXFxcKlxcXFwnXFxcXChcXFxcKVxcXFwsXFxcXDtcXFxcP1xcXFwmXFxcXD1dfCg/OlxcXFwlW2EtZkEtRjAtOV17Mn0pKXsxLDI1fSk/XFxcXEApPyk/XCIgK1xuICBcIigoPzooPzpbYS16QS1aMC05XVthLXpBLVowLTlcXFxcLV17MCw2NH1cXFxcLikrXCIgKyAgLy8gbmFtZWQgaG9zdFxuICBcIig/OlwiICsgLy8gcGx1cyB0b3AgbGV2ZWwgZG9tYWluXG4gIFwiKD86YWVyb3xhcnBhfGFzaWF8YVtjZGVmZ2lsbW5vcXJzdHV3eHpdKVwiICtcbiAgXCJ8KD86Yml6fGJbYWJkZWZnaGlqbW5vcnN0dnd5el0pXCIgK1xuICBcInwoPzpjYXR8Y29tfGNvb3B8Y1thY2RmZ2hpa2xtbm9ydXZ4eXpdKVwiICtcbiAgXCJ8ZFtlamttb3pdXCIgK1xuICBcInwoPzplZHV8ZVtjZWdyc3R1XSlcIiArXG4gIFwifGZbaWprbW9yXVwiICtcbiAgXCJ8KD86Z292fGdbYWJkZWZnaGlsbW5wcXJzdHV3eV0pXCIgK1xuICBcInxoW2ttbnJ0dV1cIiArXG4gIFwifCg/OmluZm98aW50fGlbZGVsbW5vcXJzdF0pXCIgK1xuICBcInwoPzpqb2JzfGpbZW1vcF0pXCIgK1xuICBcInxrW2VnaGltbnJ3eXpdXCIgK1xuICBcInxsW2FiY2lrcnN0dXZ5XVwiICtcbiAgXCJ8KD86bWlsfG1vYml8bXVzZXVtfG1bYWNkZ2hrbG1ub3BxcnN0dXZ3eHl6XSlcIiArXG4gIFwifCg/Om5hbWV8bmV0fG5bYWNlZmdpbG9wcnV6XSlcIiArXG4gIFwifCg/Om9yZ3xvbSlcIiArXG4gIFwifCg/OnByb3xwW2FlZmdoa2xtbnJzdHd5XSlcIiArXG4gIFwifHFhXCIgK1xuICBcInxyW2VvdXddXCIgK1xuICBcInxzW2FiY2RlZ2hpamtsbW5vcnR1dnl6XVwiICtcbiAgXCJ8KD86dGVsfHRyYXZlbHx0W2NkZmdoamtsbW5vcHJ0dnd6XSlcIiArXG4gIFwifHVbYWdrbXN5el1cIiArXG4gIFwifHZbYWNlZ2ludV1cIiArXG4gIFwifHdbZnNdXCIgK1xuICBcInx5W2V0dV1cIiArXG4gIFwifHpbYW13XSkpXCIgK1xuICBcInwoPzooPzoyNVswLTVdfDJbMC00XVwiICsgLy8gb3IgaXAgYWRkcmVzc1xuICBcIlswLTldfFswLTFdWzAtOV17Mn18WzEtOV1bMC05XXxbMS05XSlcXFxcLig/OjI1WzAtNV18MlswLTRdWzAtOV1cIiArXG4gIFwifFswLTFdWzAtOV17Mn18WzEtOV1bMC05XXxbMS05XXwwKVxcXFwuKD86MjVbMC01XXwyWzAtNF1bMC05XXxbMC0xXVwiICtcbiAgXCJbMC05XXsyfXxbMS05XVswLTldfFsxLTldfDApXFxcXC4oPzoyNVswLTVdfDJbMC00XVswLTldfFswLTFdWzAtOV17Mn1cIiArXG4gIFwifFsxLTldWzAtOV18WzAtOV0pKSlcIiArXG4gIFwiKD86XFxcXDpcXFxcZHsxLDV9KT8pXCIgKyAvLyBwbHVzIG9wdGlvbiBwb3J0IG51bWJlciArXG4gIFwiKFxcXFwvKD86KD86W2EtekEtWjAtOVxcXFw7XFxcXC9cXFxcP1xcXFw6XFxcXEBcXFxcJlxcXFw9XFxcXCNcXFxcflwiICsgLy8gcGx1cyBvcHRpb24gcXVlcnkgcGFyYW1zXG4gIFwiXFxcXC1cXFxcLlxcXFwrXFxcXCFcXFxcKlxcXFwnXFxcXChcXFxcKVxcXFwsXFxcXF9dKXwoPzpcXFxcJVthLWZBLUYwLTldezJ9KSkqKT9cIiArXG4gIFwiKD86XFxcXGJ8JClcIjsgLy8gYW5kIGZpbmFsbHksIGEgd29yZCBib3VuZGFyeSBvciBlbmQgb2Zcbi8vIGlucHV0LiAgVGhpcyBpcyB0byBzdG9wIGZvby5zdXJlIGZyb21cbi8vIG1hdGNoaW5nIGFzIGZvby5zdVxuXG5cbmNvbnN0IGVtYWlsQWRkcmVzc1BhdHRlcm4gPSBcIlthLXpBLVowLTlcXFxcK1xcXFwuXFxcXF9cXFxcJVxcXFwtXXsxLDI1Nn1cIiArXG4gIFwiXFxcXEBcIiArXG4gIFwiW2EtekEtWjAtOV1bYS16QS1aMC05XFxcXC1dezAsNjR9XCIgK1xuICBcIihcIiArXG4gIFwiXFxcXC5cIiArXG4gIFwiW2EtekEtWjAtOV1bYS16QS1aMC05XFxcXC1dezAsMjV9XCIgK1xuICBcIikrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbm9uTGF0aW5Mb3dlcmNhc2UsXG4gIG5vbkxhdGluVXBwZXJjYXNlLFxuICBub25MYXRpbkNoYXJzLFxuICBsb3dlcmNhc2VDaGFycyxcbiAgdXBwZXJjYXNlQ2hhcnMsXG4gIGFsbENoYXJzLFxuICBzaW5nbGVRdW90ZUFkZXB0cyxcbiAgZG91YmxlUXVvdGVBZGVwdHMsXG4gIHNwYWNlLFxuICBuYnNwLFxuICBoYWlyU3BhY2UsXG4gIG5hcnJvd05ic3AsXG4gIHNwYWNlcyxcbiAgdGVybWluYWxQdW5jdHVhdGlvbixcbiAgc2VudGVuY2VQdW5jdHVhdGlvbixcbiAgb3BlbmluZ0JyYWNrZXRzLFxuICBjbG9zaW5nQnJhY2tldHMsXG4gIGVsbGlwc2lzLFxuICBkZWdyZWUsXG4gIHdlYlVybFBhdHRlcm4sXG4gIGVtYWlsQWRkcmVzc1BhdHRlcm4sXG59XG4iLCIvKlxyXG5cdFJlbW92ZXMgZW1wdHkgbGluZXNcclxuXHJcblx0QHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cclxuXHRAcmV0dXJucyB7c3RyaW5nfSDigJQgb3V0cHV0IHdpdGggcmVtb3ZlZCBlbXB0eSBsaW5lc1xyXG4qL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRW1wdHlMaW5lcyhzdHJpbmcpIHtcclxuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoL15cXHMrL2dtLCBcIlwiKTtcclxufVxyXG4iLCJjb25zdCBzeW1ib2xzID0ge1xyXG4gIFwiXFxcXChDXFxcXClcIjogXCLCqVwiLFxyXG4gIFwiXFxcXChjXFxcXClcIjogXCLCqVwiLFxyXG5cdFwiXFxcXChQXFxcXClcIjogXCLik4VcIixcclxuXHRcIlxcXFwocFxcXFwpXCI6IFwi4pOFXCIsXHJcbiAgXCJcXFxcKFJcXFxcKVwiOiBcIsKuXCIsXHJcbiAgXCJcXFxcKHJcXFxcKVwiOiBcIsKuXCIsXHJcbiAgXCJcXFxcKFRNXFxcXClcIjogXCLihKJcIixcclxuICBcIlxcXFwodG1cXFxcKVwiOiBcIuKEolwiLFxyXG4gIFwiXFxcXCtcXFxcLVwiOiBcIsKxXCIsXHJcbiAgXCJcXFxcLVxcXFwrXCI6IFwiwrFcIixcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlU3ltYm9scyhzdHJpbmcpIHtcclxuXHRmb3IgKHZhciBzeW1ib2wgaW4gc3ltYm9scykge1xyXG5cdFx0Y29uc3QgcmUgPSBuZXcgUmVnRXhwKHN5bWJvbCwgXCJnXCIpO1xyXG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHN5bWJvbHNbc3ltYm9sXSk7XHJcblx0fVxyXG5cdHJldHVybiBzdHJpbmc7XHJcbn1cclxuIiwiLyohXG4gKiBUeXBvcG8gMS40LjBcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNS0xNyBCcmHFiG8gxaBhbmRhbGFcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICpcbiAqIERhdGU6IDIwMTctMDEtMTVcbiAqL1xuXG5pbXBvcnQge3JlcGxhY2VTeW1ib2xzfSBmcm9tIFwiLi9saWIvc3ltYm9sLXJlcGxhY2VtZW50c1wiO1xuaW1wb3J0IHtyZW1vdmVFbXB0eUxpbmVzfSBmcm9tIFwiLi9saWIvZW1wdHktbGluZXNcIjtcbmltcG9ydCBjb25zdGFudHMgZnJvbSAnLi9saWIvY29uc3RhbnRzJztcblxuXG52YXIgZXhjZXB0aW9ucyA9IFtdO1xuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qXFxcblx0RXNlbnRpYWwgcmVwbGFjZW1lbnRzXG5cXCotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXG5cbmZ1bmN0aW9uIHJlcGxhY2VfcGVyaW9kc193aXRoX2VsbGlwc2lzKHN0cmluZykge1xuXHQvKiBbMV0gcmVwbGFjZSAzIGFuZCBtb3JlIGRvdHMgd2l0aCBhbiBlbGxpcHNpcyAqL1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFwuezMsfS9nLCBcIuKAplwiKTtcblxuXHQvKiBbMl0gcmVwbGFjZSAyIGRvdHMgaW4gdGhlIG1pZGRsZSBvZiB0aGUgc2VudGVjbmUgd2l0aCBhbiBhcG9zaW9wZXNpcyAqL1xuXHR2YXIgcGF0dGVybiA9IFwiW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXVxcXFwuezJ9W1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiIOKApiBcIik7XG5cblx0LyogWzNdIHJlcGxhY2UgMiBkb3RzIGF0IHRoZSBlbmQgb2YgdGhlIHNlbnRlY25lIHdpdGggZnVsbCBzdG9wICovXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXC57Mn0vZywgXCIuXCIpO1xuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG5mdW5jdGlvbiByZW1vdmVfbXVsdGlwbGVfc3BhY2VzKHN0cmluZykge1xuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyB7Mix9L2csIFwiIFwiKTtcbn1cblxuXG5cblxuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSpcXFxuXHRRdW90ZXMsIHByaW1lcyAmIGFwb3N0cm9waGVzXG5cXCotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXG5cbi8qXG5cdENvcnJlY3RzIGltcHJvcGVyIHVzZSBvZiBkb3VibGUgcXVvdGVzIGFuZCBkb3VibGUgcHJpbWVzXG5cblx0QXNzdW1wdGlvbnMgYW5kIExpbWl0YXRpb25zXG5cdFRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IGRvdWJsZSBxdW90ZXMgYXJlIGFsd2F5cyB1c2VkIGluIHBhaXIsXG5cdGkuZS4gYXV0aG9ycyBkaWQgbm90IGZvcmdldCB0byBjbG9zZSBkb3VibGUgcXVvdGVzIGluIHRoZWlyIHRleHQuXG5cblx0QWxnb3JpdGhtXG5cdFswXSBSZW1vdmUgZXh0cmEgdGVybWluYWwgcHVuY3R1YXRpb24gYXJvdW5kIGRvdWJsZSBxdW90ZXNcblx0WzFdIFN3YXAgcmlnaHQgZG91YmxlIHF1b3RlIGFkZXB0cyB3aXRoIGEgcHVuY3R1YXRpb25cblx0ICAgICh0aGlzIGNvbWVzIGZpcnN0IGFzIGl0IGlzIGEgcXVpdGUgY29tbW9uIG1pc3Rha2UgdGhhdCBtYXkgZXZlbnR1YWxseVxuXHRcdCAgbGVhZCB0byBpbXByb3BlciBpZGVudGlmaWNhdGlvbiBvZiBkb3VibGUgcHJpbWVzKVxuXHRbMl0gSWRlbnRpZnkgaW5jaGVzLCBhcmNzZWNvbmRzLCBzZWNvbmRzXG5cdFszXSBJZGVudGlmeSBjbG9zZWQgZG91YmxlIHF1b3Rlc1xuXHRbNF0gSWRlbnRpZnkgdGhlIHJlc3QgYXMgdW5jbG9zZWQgZG91YmxlIHF1b3RlcyAoYmVzdC1lZmZvcnQgcmVwbGFjZW1lbnQpXG5cdFs1XSBGaXggc3BhY2luZyBhcm91bmQgcXVvdGVzIGFuZCBwcmltZXNcblx0WzZdIFN3YXAgYmFjayBzb21lIG9mIHRoZSBkb3VibGUgcXVvdGVzIHdpdGggYSBwdW5jdHVhdGlvblxuXHRbN10gUmVtb3ZlIGV4dHJhIHB1bmN0dWF0aW9uIGFyb3VuZCBxdW90ZXNcblx0WzhdIFJlcGxhY2UgYWxsIGlkZW50aWZpZWQgcHVuY3R1YXRpb24gd2l0aCBhcHByb3ByaWF0ZSBwdW5jdHVhdGlvbiBpblxuXHQgICAgZ2l2ZW4gbGFuZ3VhZ2VcblxuXHRAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2Ug4oCUIGxhbmd1YWdlIG9wdGlvblxuXHRAcmV0dXJucyB7c3RyaW5nfSBvdXRwdXQgd2l0aCBwcm9wZXJseSByZXBsYWNlcyBkb3VibGUgcW91dGVzIGFuZCBkb3VibGUgcHJpbWVzXG4qL1xuZnVuY3Rpb24gY29ycmVjdF9kb3VibGVfcXVvdGVzX2FuZF9wcmltZXMoc3RyaW5nLCBsYW5ndWFnZSkge1xuXG5cdC8qIFswXSBSZW1vdmUgZXh0cmEgdGVybWluYWwgcHVuY3R1YXRpb24gYXJvdW5kIGRvdWJsZSBxdW90ZXNcblx0XHRcdFx0XHQgZS5nLiDigJxXZSB3aWxsIGNvbnRpbnVlIHRvbW9ycm93LuKAnS4gKi9cblx0dmFyIHBhdHRlcm4gPSBcIihbXCIgKyBjb25zdGFudHMuc2VudGVuY2VQdW5jdHVhdGlvbiArIFwiXSkoXCIrIGNvbnN0YW50cy5kb3VibGVRdW90ZUFkZXB0cyArIFwiKShbXCIgKyBjb25zdGFudHMuc2VudGVuY2VQdW5jdHVhdGlvbiArIFwiXSlcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDJcIik7XG5cblx0LyogWzFdIFN3YXAgcmlnaHQgZG91YmxlIHF1b3RlIGFkZXB0cyB3aXRoIGEgdGVybWluYWwgcHVuY3R1YXRpb24gKi9cblx0cGF0dGVybiA9IFwiKFwiKyBjb25zdGFudHMuZG91YmxlUXVvdGVBZGVwdHMgKyBcIikoW1wiICsgY29uc3RhbnRzLnRlcm1pbmFsUHVuY3R1YXRpb24gKyBcIl0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCAnJDIkMScpO1xuXG5cdC8qIFsyXSBJZGVudGlmeSBpbmNoZXMsIGFyY3NlY29uZHMsIHNlY29uZHNcblx0XHRcdFx0IE5vdGU6IHdl4oCZcmUgbm90IHVzaW5nIGNvbnN0YW50cy5kb3VibGVRdW90ZUFkZXB0cyB2YXJpYWJsZVxuXHRcdFx0XHQgYXMgY29tbWFzIGFuZCBsb3ctcG9zaXRpb25lZCBxdW90ZXMgYXJlIG9tbWl0ZWQqL1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFxcZCA/KSjigJx84oCdfFxcXCJ84oCzfOKAmHsyLH184oCZezIsfXwnezIsfXzigLJ7Mix9KS9nLCBcIiQxe3t0eXBvcG9fX2RvdWJsZS1wcmltZX19XCIpO1xuXG5cblx0LyogWzNdIElkZW50aWZ5IGNsb3NlZCBkb3VibGUgcXVvdGVzICovXG5cdHBhdHRlcm4gPSBcIihcIiArIGNvbnN0YW50cy5kb3VibGVRdW90ZUFkZXB0cyArIFwiKSguKj8pKFwiICsgY29uc3RhbnRzLmRvdWJsZVF1b3RlQWRlcHRzICsgXCIpXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcInt7dHlwb3BvX19sZWZ0LWRvdWJsZS1xdW90ZX19JDJ7e3R5cG9wb19fcmlnaHQtZG91YmxlLXF1b3RlfX1cIik7XG5cblxuXHQvKiBbNC4xXSBJZGVudGlmeSB1bmNsb3NlZCBsZWZ0IGRvdWJsZSBxdW90ZSAqL1xuXHRwYXR0ZXJuID0gXCIoXCIgKyBjb25zdGFudHMuZG91YmxlUXVvdGVBZGVwdHMgKyBcIikoW1wiICsgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICsgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICsgXCJdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCJ7e3R5cG9wb19fbGVmdC1kb3VibGUtcXVvdGV9fSQyXCIpO1xuXG5cblx0LyogWzQuMl0gSWRlbnRpZnkgdW5jbG9zZWQgcmlnaHQgZG91YmxlIHF1b3RlICovXG5cdHBhdHRlcm4gPSBcIihbXCIgKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgKyBjb25zdGFudHMuc2VudGVuY2VQdW5jdHVhdGlvbiArIGNvbnN0YW50cy5lbGxpcHNpcyArIFwiXSkoXCIgKyBjb25zdGFudHMuZG91YmxlUXVvdGVBZGVwdHMgKyBcIilcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDF7e3R5cG9wb19fcmlnaHQtZG91YmxlLXF1b3RlfX1cIik7XG5cblxuXHQvKiBbNC4zXSBSZW1vdmUgcmVtYWluaW5nIHVuaWRlbnRpZmllZCBkb3VibGUgcXVvdGUgKi9cblx0cGF0dGVybiA9IFwiKFtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl0pKFwiICsgY29uc3RhbnRzLmRvdWJsZVF1b3RlQWRlcHRzICsgXCIpKFtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDNcIik7XG5cblxuXHQvKiBbNV0gRml4IHNwYWNpbmcgYXJvdW5kIHF1b3RlcyBhbmQgcHJpbWUgKi9cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyh7e3R5cG9wb19fbGVmdC1kb3VibGUtcXVvdGV9fSkoICkvZywgXCIkMVwiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyggKSh7e3R5cG9wb19fcmlnaHQtZG91YmxlLXF1b3RlfX0pL2csIFwiJDJcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oICkoe3t0eXBvcG9fX2RvdWJsZS1wcmltZX19KS9nLCBcIiQyXCIpO1xuXG5cblx0LyogWzZdIFN3YXAgYmFjayBzb21lIG9mIHRoZSBkb3VibGUgcXVvdGVzIHdpdGggYSBwdW5jdHVhdGlvblxuXG5cdFx0IElkZWFcblx0XHQgSW4gWzFdIHdlIGhhdmUgc3dhcHBlZCBhbGwgZG91YmxlIHJpZ2h0IHF1b3RlcyBieSBkZWZhdWx0IHdpdGggYSB0ZXJtaW5hbFxuXHRcdCBwdW5jdHVhdGlvbi4gSG93ZXZlciwgbm90IGFsbCBkb3VibGUgcXVvdGVzIHdyYXAgdGhlIHdob2xlIHNlbnRlbmNlIGFuZFxuXHRcdCB0aGVyZSBhcmUgY2FzZXMgd2hlbiBmZXcgd29yZHMgYXJlIHF1b3RlZCB3aXRoaW4gYSBzZW50ZW5jZS4gVGFrZSBhIGxvb2sgYXRcblx0XHQgZXhhbXBsZXM6XG5cdFx0IOKAnFNlbnRlbmNlIHFvdXRlZCBhcyBhIHdob2xlLuKAnSAoZnVsbCBzdG9wIGlzIHBsYWNlZCB3aXRoaW4gZG91YmxlIHF1b3Rlcylcblx0XHQgVGhpcyBpcyDigJxxdW90ZWQgZXhwcmVzc2lvbi7igJ0gKGZ1bGwgc3RvcCBpcyBwbGFjZWQgb3V0c2lkZSBkb3VibGUgcXVvdGVzKVxuXG5cdFx0IEFsZ29yaXRobVxuXHRcdCBNYXRjaCBhbGwgdGhlIGRvdWJsZSBxdW90ZSBwYWlycyB0aGF0IGRvIG5vdCBwcmVjZWRlIHNlbnRlbmNlIHB1bmN0dWF0aW9uXG5cdFx0IChhbmQgdGh1cyBtdXN0IGJlIHVzZWQgd2l0aGluIGEgc2VudGVuY2UpIGFuZCBzd2FwIHJpZ2h0IGRvdWJsZSB3aXRoXG5cdFx0IGEgdGVybWluYWwgcHVuY3R1YXRpb24uXG5cdFx0ICovXG5cdHBhdHRlcm4gPSBcIihbXlwiICsgY29uc3RhbnRzLnNlbnRlbmNlUHVuY3R1YXRpb24gKyBcIl1bXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJde3t0eXBvcG9fX2xlZnQtZG91YmxlLXF1b3RlfX0uKz8pKFtcIiArIGNvbnN0YW50cy50ZXJtaW5hbFB1bmN0dWF0aW9uICsgXCJdKSh7e3R5cG9wb19fcmlnaHQtZG91YmxlLXF1b3RlfX0pXCI7XG5cdC8vIGNvbnNvbGUubG9nKHBhdHRlcm4pO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQzJDJcIik7XG5cblxuXHQvKiBbN10gUmVtb3ZlIGV4dHJhIGNvbW1hIGFmdGVyIHB1bmN0dWF0aW9uIGluIGRpcmVjdCBzcGVlY2gsXG5cdFx0XHRcdFx0IGUuZy4gXCLigJxIZXkhLOKAnSBzaGUgc2FpZFwiICovXG5cdHBhdHRlcm4gPSBcIihbXCIgKyBjb25zdGFudHMuc2VudGVuY2VQdW5jdHVhdGlvbiArIFwiXSkoW1xcLF0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxXCIpO1xuXG5cblx0LyogWzhdIFB1bmN0dWF0aW9uIHJlcGxhY2VtZW50ICovXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oe3t0eXBvcG9fX2RvdWJsZS1wcmltZX19KS9nLCBcIuKAs1wiKTtcblxuXHRzd2l0Y2ggKGxhbmd1YWdlKSB7XG5cdFx0Y2FzZSBcInJ1ZVwiOlxuXHRcdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyh7e3R5cG9wb19fbGVmdC1kb3VibGUtcXVvdGV9fSkvZywgXCLCq1wiKTtcblx0XHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oe3t0eXBvcG9fX3JpZ2h0LWRvdWJsZS1xdW90ZX19KS9nLCBcIsK7XCIpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcInNrXCI6XG5cdFx0Y2FzZSBcImNzXCI6XG5cdFx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKHt7dHlwb3BvX19sZWZ0LWRvdWJsZS1xdW90ZX19KS9nLCBcIuKAnlwiKTtcblx0XHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oe3t0eXBvcG9fX3JpZ2h0LWRvdWJsZS1xdW90ZX19KS9nLCBcIuKAnFwiKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJlblwiOlxuXHRcdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyh7e3R5cG9wb19fbGVmdC1kb3VibGUtcXVvdGV9fSkvZywgXCLigJxcIik7XG5cdFx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKHt7dHlwb3BvX19yaWdodC1kb3VibGUtcXVvdGV9fSkvZywgXCLigJ1cIik7XG5cdFx0XHRicmVhaztcblx0fVxuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG4vKlxuXHRDb3JyZWN0cyBpbXByb3BlciB1c2Ugb2Ygc2luZ2xlIHF1b3Rlcywgc2luZ2xlIHByaW1lcyBhbmQgYXBvc3Ryb3BoZXNcblxuXHRBc3N1bXB0aW9ucyBhbmQgTGltaXRhdGlvbnNcblx0VGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgZG91YmxlIHF1b3RlcyBhcmUgYWx3YXlzIHVzZWQgaW4gcGFpcixcblx0aS5lLiBhdXRob3JzIGRpZCBub3QgZm9yZ2V0IHRvIGNsb3NlIGRvdWJsZSBxdW90ZXMgaW4gdGhlaXIgdGV4dC5cblx0RnVydGhlciwgc2luZ2xlIHF1b3RlcyBhcmUgdXNlZCBhcyBzZWNvbmRhcnkgYW5kIHRoZXkncmUgcHJvcGVybHkgc3BhY2VkLFxuXHRlLmcuIOKQoyd3b3JkIG9yIHNlbnRlbmNlIHBvcnRpb24n4pCjIChhbmQgbm90IGxpa2Ug4pCjJ+KQo3dvcmTikKMn4pCjKVxuXG5cdEFsZ29yaXRobVxuXHRbMV0gSWRlbnRpZnkgY29tbW9uIGFwb3N0cm9oZSBjb250cmFjdGlvbnNcblx0WzJdIElkZW50aWZ5IHNpbmdsZSBxdW90ZXNcblx0WzNdIElkZW50aWZ5IGZlZXQsIGFyY21pbnV0ZXMsIG1pbnV0ZXNcblx0WzRdIElkZW50aWZ5IHJlc2lkdWFsIGFwb3N0cm9waGVzIHRoYXQgaGF2ZSBsZWZ0XG5cdFs/XSBTd2FwIHJpZ2h0IHNpbmdsZSBxdW90ZSBhZGVwdHMgd2l0aCBhIHB1bnR1YXRpb25cblx0XHRcdChXZSB3ZXJlIHN3YXBwaW5nIHNpbmdsZSBxdW90ZXMgYXMgcGFydCBvZiBhbGdvcml0aG0gYSB3aGlsZSBhIGJhY2ssXG5cdFx0XHRidXQgc2luY2UgaXQgaXMgbW9yZSBwcm9iYWJsZSB0aGF0IHNpbmdsZSBxdW90ZXMgYXJlIGluIHRoZSBtaWRkbGUgb2YgdGhlXG5cdFx0XHRzZW50ZW5jZSwgd2UgaGF2YWUgZHJvcHBlZCBzd2FwcGluZyBhcyBhIHBhcnQgb2YgdGhlIGFsZ29yaXRobSlcblx0WzZdIFJlcGxhY2UgYWxsIGlkZW50aWZpZWQgcHVuY3R1YXRpb24gd2l0aCBhcHByb3ByaWF0ZSBwdW5jdHVhdGlvbiBpblxuXHQgICAgZ2l2ZW4gbGFuZ3VhZ2VcblxuXHRAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2Ug4oCUIGxhbmd1YWdlIG9wdGlvbnNcblx0QHJldHVybnMge3N0cmluZ30g4oCUIGNvcnJlY3RlZCBvdXRwdXRcbiovXG5mdW5jdGlvbiBjb3JyZWN0X3NpbmdsZV9xdW90ZXNfcHJpbWVzX2FuZF9hcG9zdHJvcGhlcyhzdHJpbmcsIGxhbmd1YWdlKSB7XG5cblx0LyogWzEuMV0gSWRlbnRpZnkg4oCZbuKAmSBjb250cmFjdGlvbnMgKi9cblx0dmFyIHBhdHRlcm4gPSBcIihcIiArIGNvbnN0YW50cy5zaW5nbGVRdW90ZUFkZXB0cyArIFwiKShuKShcIiArIGNvbnN0YW50cy5zaW5nbGVRdW90ZUFkZXB0cyArIFwiKVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ2lcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcInt7dHlwb3BvX19hcG9zdHJvcGhlfX0kMnt7dHlwb3BvX19hcG9zdHJvcGhlfX1cIik7XG5cblxuXHQvKiBbMS4yXSBJZGVudGlmeSBjb21tb24gY29udHJhY3Rpb25zIGF0IHRoZSBiZWdpbm5pbmcgb3IgYXQgdGhlIGVuZFxuXHRcdFx0XHRcdCBvZiB0aGUgd29yZCwgZS5nLiBGaXNoIOKAmW7igJkgQ2hpcHMsIOKAmWVtLCDigJljYXVzZSzigKYgKi9cblx0dmFyIGNvbnRyYWN0aW9uX2V4YW1wbGVzID0gXCJlbXxjYXVzZXx0d2FzfHRpc3x0aWx8cm91bmRcIlxuXHRwYXR0ZXJuID0gXCIoXCIgKyBjb25zdGFudHMuc2luZ2xlUXVvdGVBZGVwdHMgKyBcIikoXCIgKyBjb250cmFjdGlvbl9leGFtcGxlcyArIFwiKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnaVwiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwie3t0eXBvcG9fX2Fwb3N0cm9waGV9fSQyXCIpO1xuXG5cblx0LyogWzEuM10gSWRlbnRpZnkgaW4td29yZCBjb250cmFjdGlvbnMsXG5cdFx0XHRcdFx0IGUuZy4gRG9u4oCZdCwgSeKAmW0sIE/igJlEb29sZSwgNjnigJllcnMgKi9cblx0dmFyIGNoYXJhY3Rlcl9hZGVwdHMgPSBcIjAtOVwiICsgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICsgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzO1xuXHRwYXR0ZXJuID0gXCIoW1wiKyBjaGFyYWN0ZXJfYWRlcHRzICtcIl0pKFwiICsgY29uc3RhbnRzLnNpbmdsZVF1b3RlQWRlcHRzICsgXCIpKFtcIisgY2hhcmFjdGVyX2FkZXB0cyArXCJdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMXt7dHlwb3BvX19hcG9zdHJvcGhlfX0kM1wiKTtcblxuXG5cdC8qIFsxLjRdIElkZW50aWZ5IHllYXIgY29udHJhY3Rpb25zXG5cdFx0IGUuZy4g4oCZNzBzLCBJTkNIRUJBIOKAmTg5LOKApiAqL1xuXHRwYXR0ZXJuID0gXCIoXCIgKyBjb25zdGFudHMuc2luZ2xlUXVvdGVBZGVwdHMgKyBcIikoWzAtOV17Mn0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcInt7dHlwb3BvX19hcG9zdHJvcGhlfX0kMlwiKTtcblxuXG5cdC8qIFsyXSBJZGVudGlmeSBzaW5nbGUgcXVvdGVzIHdpdGhpbiBkb3VibGUgcXVvdGVzICovXG5cdHBhdHRlcm4gPSBcIihcIiArIGNvbnN0YW50cy5kb3VibGVRdW90ZUFkZXB0cyArIFwiKSguKj8pKFwiICsgY29uc3RhbnRzLmRvdWJsZVF1b3RlQWRlcHRzICsgXCIpXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBmdW5jdGlvbigkMCwgJDEsICQyLCAkMyl7XG5cblx0XHQvL2lkZW50aWZ5IHt7dHlwb3BvX19sZWZ0LXNpbmdsZS1xdW90ZS0tYWRlcHR9fVxuXHRcdHZhciBwYXR0ZXJuID0gXCIoICkoXCIgKyBjb25zdGFudHMuc2luZ2xlUXVvdGVBZGVwdHMgKyBcIikoW1wiKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgK1wiXSlcIjtcblx0XHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0XHQkMiA9ICQyLnJlcGxhY2UocmUsIFwiJDF7e3R5cG9wb19fbGVmdC1zaW5nbGUtcXVvdGUtLWFkZXB0fX0kM1wiKTtcblxuXHRcdC8vaWRlbnRpZnkge3t0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZS0tYWRlcHR9fVxuXHRcdHBhdHRlcm4gPSBcIihbXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArXCJdKShbXFwuLCE/XSk/KFwiICsgY29uc3RhbnRzLnNpbmdsZVF1b3RlQWRlcHRzICsgXCIpKFsgXXxbXFwuLCE/XSlcIjtcblx0XHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRcdCQyID0gJDIucmVwbGFjZShyZSwgXCIkMSQye3t0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZS0tYWRlcHR9fSQ0XCIpO1xuXG5cdFx0Ly9pZGVudGlmeSBzaW5nbGUgcXVvdGUgcGFpcnNcblx0XHRwYXR0ZXJuID0gXCIoe3t0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlLS1hZGVwdH19KSguKj8pKHt7dHlwb3BvX19yaWdodC1zaW5nbGUtcXVvdGUtLWFkZXB0fX0pXCI7XG5cdFx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0XHQkMiA9ICQyLnJlcGxhY2UocmUsIFwie3t0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlfX0kMnt7dHlwb3BvX19yaWdodC1zaW5nbGUtcXVvdGV9fVwiKTtcblxuXHRcdHJldHVybiAkMSArICQyICsgJDM7XG5cdH0pO1xuXG5cblx0LyogWzNdIElkZW50aWZ5IGZlZXQsIGFyY21pbnV0ZXMsIG1pbnV0ZXNcblx0XHRcdFx0IE5vdGU6IHdl4oCZcmUgbm90IHVzaW5nIGNvbnN0YW50cy5zaW5nbGVRdW90ZUFkZXB0cyB2YXJpYWJsZVxuXHRcdFx0XHQgYXMgY29tbWFzIGFuZCBsb3ctcG9zaXRpb25lZCBxdW90ZXMgYXJlIG9tbWl0ZWQqL1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFxcZCkoID8pKCd84oCYfOKAmXzigJt84oCyKS9nLCBcIiQxe3t0eXBvcG9fX3NpbmdsZS1wcmltZX19XCIpO1xuXG5cblx0LyogWzRdIElkZW50aWZ5IHJlc2lkdWFsIGFwb3N0cm9waGVzIHRoYXQgaGF2ZSBsZWZ0ICovXG5cdHBhdHRlcm4gPSBcIihcIiArIGNvbnN0YW50cy5zaW5nbGVRdW90ZUFkZXB0cyArIFwiKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCJ7e3R5cG9wb19fYXBvc3Ryb3BoZX19XCIpO1xuXG5cblxuXHQvKiBbNV0gUHVuY3R1YXRpb24gcmVwbGFjZW1lbnQgKi9cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyh7e3R5cG9wb19fc2luZ2xlLXByaW1lfX0pL2csIFwi4oCyXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgve3t0eXBvcG9fX2Fwb3N0cm9waGV9fXx7e3R5cG9wb19fbGVmdC1zaW5nbGUtcXVvdGUtLWFkZXB0fX18e3t0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZS0tYWRlcHR9fS9nLCBcIuKAmVwiKTtcblxuXG5cdHN3aXRjaCAobGFuZ3VhZ2UpIHtcblx0Y2FzZSBcInJ1ZVwiOlxuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC97e3R5cG9wb19fbGVmdC1zaW5nbGUtcXVvdGV9fS9nLCBcIuKAuVwiKTtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgve3t0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZX19L2csIFwi4oC6XCIpO1xuXHRcdGJyZWFrO1xuXHRjYXNlIFwic2tcIjpcblx0Y2FzZSBcImNzXCI6XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL3t7dHlwb3BvX19sZWZ0LXNpbmdsZS1xdW90ZX19L2csIFwi4oCaXCIpO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC97e3R5cG9wb19fcmlnaHQtc2luZ2xlLXF1b3RlfX0vZywgXCLigJhcIik7XG5cdFx0YnJlYWs7XG5cdGNhc2UgXCJlblwiOlxuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC97e3R5cG9wb19fbGVmdC1zaW5nbGUtcXVvdGV9fS9nLCBcIuKAmFwiKTtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgve3t0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZX19L2csIFwi4oCZXCIpO1xuXHR9XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cbmZ1bmN0aW9uIGNvcnJlY3RfbXVsdGlwbGVfc2lnbihzdHJpbmcpIHtcblx0cmV0dXJuIHJlbW92ZV9tdWx0aXBsZV9zcGFjZXMoc3RyaW5nLnJlcGxhY2UoLyhbMS05XStbIF17MCwxfVthLXd6XSopKFsgXXswLDF9W3h8w5ddWyBdezAsMX0pKFsxLTldK1sgXXswLDF9W2Etd3pdKikvZywgXCIkMSDDlyAkM1wiKSk7XG59XG5cblxuXG4vKlxuXHRSZXBsYWNlcyBoeXBoZW4gd2l0aCBlbSBvciBlbiBkYXNoXG5cblx0QWxnb3JpdGhtXG5cdFsxXSBSZXBsYWNlIDMgY29uc2VjdXRpdmUgaHlwaGVucyAoLS0tKSB3aXRoIGFuIGVtIGRhc2ggKOKAlClcblx0WzJdIFJlcGxhY2UgMiBjb25zZWN1dGl2ZSBoeXBoZW5zICgtLSkgd2l0aCBhbiBlbiBkYXNoICjigJQpXG5cdFszXSBSZXBsYWNlIGFueSBoeXBoZW4gb3IgZGFzaCBzdXJyb3VuZGVkIHdpdGggc3BhY2VzIHdpdGggYW4gZW0gZGFzaFxuXHRbNF0gUmVwbGFjZSBoeXBoZW4gb3IgZGFzaCB1c2VkIGluIG51bWJlciByYW5nZSB3aXRoIGFuIGVuIGRhc2hcblx0XHRcdGFuZCBzZXQgcHJvcGVyIHNwYWNpbmdcblxuXHRAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcmV0dXJucyB7c3RyaW5nfSDigJQgb3V0cHV0IHdpdGggZGFzaGVzIGluc3RlYWQgb2YgaHlwaGVuc1xuKi9cbmZ1bmN0aW9uIHJlcGxhY2VfaHlwaGVuX3dpdGhfZGFzaChzdHJpbmcsIGxhbmd1YWdlKSB7XG5cdHZhciBkYXNoZXMgPSBcIi3igJPigJRcIjsgLy8gaW5jbHVkaW5nIGEgaHlwaGVuXG5cblx0LyogWzFdIFJlcGxhY2UgMyBjb25zZWN1dGl2ZSBoeXBoZW5zICgtLS0pIHdpdGggYW4gZW0gZGFzaCAo4oCUKSAqL1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKC0tLSkvZywgXCLigJRcIik7XG5cblxuXHQvKiBbMl0gUmVwbGFjZSAyIGNvbnNlY3V0aXZlIGh5cGhlbnMgKC0tKSB3aXRoIGFuIGVuIGRhc2ggKOKAlCkgKi9cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLygtLSkvZywgXCLigJNcIik7XG5cblxuXHQvKiBbM10gUmVwbGFjZSBhbnkgaHlwaGVuIG9yIGRhc2ggc3Vycm91bmRlZCB3aXRoIHNwYWNlcyB3aXRoIGFuIGVtIGRhc2ggKi9cblx0dmFyIHBhdHRlcm4gPSBcIltcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl1bXCIgKyBkYXNoZXMgKyBcIl1bXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHR2YXIgcmVwbGFjZW1lbnQgPSBjb25zdGFudHMubmFycm93TmJzcCArIFwi4oCUXCIgKyBjb25zdGFudHMuaGFpclNwYWNlO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXG5cdC8qIFs0LjFdIFJlcGxhY2UgaHlwaGVuIG9yIGRhc2gsIHBsYWNlZCBiZXR3ZWVuIDIgY2FyZGluYWwgbnVtYmVycyxcblx0XHRcdFx0XHQgd2l0aCBhbiBlbiBkYXNoOyBpbmNsdWRpbmcgY2FzZXMgd2hlbiB0aGVyZSBpcyBhbiBleHRyYSBzcGFjZVxuXHRcdFx0XHRcdCBmcm9tIGVpdGhlciBvbmUgc2lkZSBvciBib3RoIHNpZGVzIG9mIHRoZSBkYXNoICovXG5cdHZhciBjYXJkaW5hbF9udW1iZXIgPSBcIlxcXFxkK1wiO1xuXHRwYXR0ZXJuID0gXCIoXCIgKyBjYXJkaW5hbF9udW1iZXIgKyBcIikoW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXT9bXCIgKyBkYXNoZXMgKyBcIl1bXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdPykoXCIgKyBjYXJkaW5hbF9udW1iZXIgKyBcIilcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDHigJMkM1wiKTtcblxuXG5cdC8qIFs0LjJdIFJlcGxhY2UgaHlwaGVuIG9yIGRhc2gsIHBsYWNlZCBiZXR3ZWVuIDIgb3JkaW5hbCBudW1iZXJzLFxuXHRcdFx0XHRcdCB3aXRoIGFuIGVuIGRhc2g7IGluY2x1ZGluZyBjYXNlcyB3aGVuIHRoZXJlIGlzIGFuIGV4dHJhIHNwYWNlXG5cdFx0XHRcdFx0IGZyb20gZWl0aGVyIG9uZSBzaWRlIG9yIGJvdGggc2lkZXMgb2YgdGhlIGRhc2ggKi9cblx0dmFyIG9yZGluYWxfaW5kaWNhdG9yID0gXCJcIjtcblx0c3dpdGNoIChsYW5ndWFnZSkge1xuXHRcdGNhc2UgXCJydWVcIjpcblx0XHRjYXNlIFwic2tcIjpcblx0XHRjYXNlIFwiY3NcIjpcblx0XHRcdG9yZGluYWxfaW5kaWNhdG9yID0gXCJcXFxcLlwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcImVuXCI6XG5cdFx0XHRvcmRpbmFsX2luZGljYXRvciA9IFwic3R8bmR8cmR8dGhcIjtcblx0XHRcdGJyZWFrO1xuXHR9XG5cdHBhdHRlcm4gPSBcIihcIiArIGNhcmRpbmFsX251bWJlciArIFwiKShcIiArIG9yZGluYWxfaW5kaWNhdG9yICsgXCIpKFtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl0/W1wiICsgZGFzaGVzICsgXCJdW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXT8pKFwiICsgY2FyZGluYWxfbnVtYmVyICsgXCIpKFwiICsgb3JkaW5hbF9pbmRpY2F0b3IgKyBcIilcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ2lcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDLigJMkNCQ1XCIpO1xuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG5mdW5jdGlvbiByZXBsYWNlX2Rhc2hfd2l0aF9oeXBoZW4oc3RyaW5nKXtcblx0dmFyIHBhdHRlcm4gPSBcIihbXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArXCJdKShb4oCT4oCUXSkoW1wiKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgK1wiXSlcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHJldHVybiBzdHJpbmcucmVwbGFjZShyZSwgXCIkMS0kM1wiKTtcbn1cblxuXG5cblxuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSpcXFxuXHRDb25zb2xpZGF0aW9uIG9mIHNwYWNlc1xuXFwqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblxuXG5mdW5jdGlvbiByZW1vdmVfc3BhY2VfYmVmb3JlX3B1bmN0dWF0aW9uKHN0cmluZykge1xuXHR2YXIgcGF0dGVybiA9IFwiKFtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl0pKFtcIiArIGNvbnN0YW50cy5zZW50ZW5jZVB1bmN0dWF0aW9uICsgY29uc3RhbnRzLmNsb3NpbmdCcmFja2V0cyArIGNvbnN0YW50cy5kZWdyZWUgKyBcIl0pXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDJcIik7XG59XG5cblxuXG5mdW5jdGlvbiByZW1vdmVfc3BhY2VfYWZ0ZXJfcHVuY3R1YXRpb24oc3RyaW5nKSB7XG5cdHZhciBwYXR0ZXJuID0gXCIoW1wiICsgY29uc3RhbnRzLm9wZW5pbmdCcmFja2V0cyArIFwiXSkoW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXSlcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHJldHVybiBzdHJpbmcucmVwbGFjZShyZSwgXCIkMVwiKTtcbn1cblxuXG5cbmZ1bmN0aW9uIHJlbW92ZV90cmFpbGluZ19zcGFjZXMoc3RyaW5nKSB7XG5cdHJldHVybiBzdHJpbmcudHJpbSgpO1xufVxuXG5cblxuZnVuY3Rpb24gYWRkX3NwYWNlX2JlZm9yZV9wdW5jdHVhdGlvbihzdHJpbmcpIHtcblx0dmFyIHBhdHRlcm4gPSBcIihbXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArIFwiXSkoW1wiICsgY29uc3RhbnRzLm9wZW5pbmdCcmFja2V0cyArIFwiXSkoW1wiKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgKyBcIl0pXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEgJDIkM1wiKTtcbn1cblxuXG5cbmZ1bmN0aW9uIGFkZF9zcGFjZV9hZnRlcl9wdW5jdHVhdGlvbihzdHJpbmcpIHtcblx0dmFyIHBhdHRlcm4gPSBcIihbXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArIFwiXSkoW1wiICsgY29uc3RhbnRzLnNlbnRlbmNlUHVuY3R1YXRpb24gKyBjb25zdGFudHMuY2xvc2luZ0JyYWNrZXRzICsgXCJdKShbXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArIFwiXSlcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHJldHVybiBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQyICQzXCIpO1xufVxuXG5cblxuLypcblx0UmVtb3ZlcyBleHRyYSBzcGFjZXMgYXQgdGhlIGJlZ2lubmluZyBvZiBlYWNoIHBhcmFncmFwaFxuXG5cdFRoaXMgY291bGQgYmUgZG9uZSB3aXRoIGEgb25lLWxpbmVyOlxuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoL15cXHMrL2dtLCBcIlwiKTtcblxuXHRIb3dldmVyLCBpdCBhbHNvIHJlbW92ZXMgZW1wdHkgbGluZXMuIFNpbmNlLCB3ZSB3YW50IHRvIGhhbmRsZSB0aGlzIGNoYW5nZVxuXHRzZXBhcmF0ZWx5LCB3ZSBuZWVkIHRvXG5cdFsxXSBzcGxpdCB0aGUgbGluZXMgbWFudWFsbHlcblx0WzJdIGFuZCByZW1vdmUgZXh0cmEgc3BhY2VzIGF0IHRoZSBiZWdpbmluZyBvZiBlYWNoIGxpbmVcblx0WzNdIGpvaW4gbGluZXMgdG9nZXRoZXIgdG8gYSBzaW5nbGUgc3RyaW5nXG5cblx0QHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cblx0QHJldHVybnMge3N0cmluZ30g4oCUIG91dHB1dCB3aXRoIHJlbW92ZWQgc3BhY2VzIGF0IHRoZSBiZWdpbm5pbmcgb2YgcGFyYWdyYXBoc1xuKi9cbmZ1bmN0aW9uIHJlbW92ZV9zcGFjZXNfYXRfcGFyYWdyYXBoX2JlZ2lubmluZyhzdHJpbmcpIHtcblx0LyogWzFdIHNwbGl0IHRoZSBsaW5lcyBtYW51YWxseSAqL1xuXHR2YXIgbGluZXMgPSBzdHJpbmcuc3BsaXQoL1xccj9cXG4vKTtcblxuXHQvKiBbMl0gYW5kIHJlbW92ZSBleHRyYSBzcGFjZXMgYXQgdGhlIGJlZ2luaW5nIG9mIGVhY2ggbGluZSAqL1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGluZXNbaV0gPSBsaW5lc1tpXS5yZXBsYWNlKC9eXFxzKy8sIFwiXCIpO1xuXHR9XG5cblx0LyogWzNdIGpvaW4gbGluZXMgdG9nZXRoZXIgdG8gYSBzaW5nbGUgc3RyaW5nICovXG5cdHJldHVybiBsaW5lcy5qb2luKFwiXFxuXCIpO1xufVxuXG5cblxuLypcblx0Q29uc29saWRhdGVzIHRoZSB1c2Ugb2Ygbm9uLWJyZWFraW5nIHNwYWNlc1xuXG5cdCogcmVtb3ZlcyBjaGFyYWN0ZXJzIGJldHdlZW4gbXVsdGktY2hhcmFjdGVyIHdvcmRzXG5cdCogYWRkcyBub24tYnJlYWtpbmcgc3BhY2VzIGFmdGVyIGNhcmRpbmFsIG51bWJlcnNcblx0KiBhZGRzIG5vbi1icmVha2luZyBzcGFjZXMgYXJvdW5kIMOXXG5cdCogYWRkcyBub24tYnJlYWtpbmcgc3BhY2VzIGFmdGVyIHNpbmdsZS1jaGFyYWN0ZXIgcHJlcG9zaXRpb25zXG5cblx0QHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cblx0QHJldHVybnMge3N0cmluZ30g4oCUIG91dHB1dCB3aXRoIGNvcnJlY3RseSBwbGFjZWQgbm9uLWJyZWFraW5nIHNwYWNlXG4qL1xuZnVuY3Rpb24gY29uc29saWRhdGVfbmJzcChzdHJpbmcpIHtcblxuXHQvLyByZW1vdmVzIG5vbi1icmVha2luZyBzcGFjZXMgYmV0d2VlbiBtdWx0aS1jaGFyYWN0ZXIgd29yZHNcblx0dmFyIHBhdHRlcm4gPSBcIihbXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArXCJdezIsfSkoW1wiKyBjb25zdGFudHMubmJzcCArIGNvbnN0YW50cy5uYXJyb3dOYnNwICtcIl0pKFtcIisgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICsgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICtcIl17Mix9KVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gIHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxICQzXCIpO1xuXHRzdHJpbmcgPSAgc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEgJDNcIik7IC8vY2FsbGluZyBpdCB0d2ljZSB0byBjYXRjaCBvZGQvZXZlbiBvY2N1cmVuY2VzXG5cblxuXHQvLyBhZGRzIG5vbi1icmVha2luZyBzcGFjZXMgYWZ0ZXIgY2FyZGluYWwgbnVtYmVyc1xuXHRwYXR0ZXJuID0gXCIoWzAtOV0rKSggKShbXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArXCJdKylcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0dmFyIHJlcGxhY2VtZW50ID0gXCIkMVwiICsgY29uc3RhbnRzLm5ic3AgKyBcIiQzXCI7XG5cdHN0cmluZyA9ICBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXG5cblx0Ly8gYWRkcyBub24tYnJlYWtpbmcgc3BhY2VzIGFyb3VuZCDDl1xuXHRwYXR0ZXJuID0gXCIoW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXSkoW8OXXSkoW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0cmVwbGFjZW1lbnQgPSBjb25zdGFudHMubmJzcCArIFwiJDJcIiArIGNvbnN0YW50cy5uYnNwO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXG5cblx0Ly8gYWRkcyBub24tYnJlYWtpbmcgc3BhY2VzIGFmdGVyIHNpbmdsZS1jaGFyYWN0ZXIgcHJlcG9zaXRpb25zXG5cdHBhdHRlcm4gPSBcIihbwqAgXSkoW1wiICsgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICsgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICsgXCJdfCYpKCApXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHJlcGxhY2VtZW50ID0gXCIkMSQyXCIgKyBjb25zdGFudHMubmJzcDtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTsgLy9jYWxsaW5nIGl0IHR3aWNlIHRvIGNhdGNoIG9kZC9ldmVuIG9jY3VyZW5jZXNcblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuLypcblx0Q29ycmVjdHMgaW1wcm9wZXIgc3BhY2luZyBhcm91bmQgZWxsaXBzaXMgYW5kIGFwb3Npb3Blc2lzXG5cblx0RWxsaXBzaXMgKGFzIGEgY2hhcmFjdGVyKSBpcyB1c2VkIGZvciAyIGRpZmZlcmVudCBwdXJwb3Nlczpcblx0MS4gYXMgYW4gZWxsaXBzaXMgdG8gb21taXQgYSBwaWVjZSBvZiBpbmZvcm1hdGlvbiBkZWxpYmVyYXRlbHlcblx0Mi4gYXMgYW4gYXBvc2lvcGVzaXM7IGEgZmlndXJlIG9mIHNwZWVjaCB3aGVyZWluIGEgc2VudGVuY2UgaXNcblx0ZGVsaWJlcmF0ZWx5IGJyb2tlbiBvZmYgYW5kIGxlZnQgdW5maW5pc2hlZFxuXG5cdHNvdXJjZXNcblx0aHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRWxsaXBzaXNcblx0aHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQXBvc2lvcGVzaXNcblx0aHR0cDovL3d3dy5saXRlZXJhLmN6L3Nsb3ZuaWsvdnlwdXN0a2FcblxuXHRBbGdvcml0aG1cblx0RWxsaXBzaXMgJiBBcG9zaW9wZXNpcyByZXF1aXJlIGRpZmZlcmVudCB1c2Ugb2Ygc3BhY2luZyBhcm91bmQgdGhlbSxcblx0dGhhdCBpcyB3aHkgd2UgYXJlIGNvcnJlY3Rpbmcgb25seSBmb2xsb3dpbmcgY2FzZXM6XG5cdGVycm9yczpcblx0WzFdIGNvcnJlY3Qgc3BhY2luZywgd2hlbiBlbGxpcHNpcyB1c2VkIHVzZWQgYXJvdW5kIGNvbW1hc1xuXHRbMl0gY29ycmVjdCBzcGFjaW5nIGZvciBhcG9zaW9wZXNpcyBhdCB0aGUgZW5kIG9mIHRoZSBzZW50ZW5jZSBpbiB0aGUgbWlkZGxlIG9mIHRoZSBwYXJhZ3JhcGhcblx0WzNdIGNvcnJlY3Qgc3BhY2luZyBmb3IgYXBvc2lvcGVzaXMgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgc2VudGVuY2UgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcGFyYWdyYXBoXG5cdFs0XSBjb3JyZWN0IHNwYWNpbmcgZm9yIGFwb3Npb3Blc2lzIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHNlbnRlbmNlIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHBhcmFncmFwaFxuXHRbNV0gY29ycmVjdCBzcGFjaW5nIGZvciBhcG9zaW9wZXNpcyBhdCB0aGUgZW5kIG9mIHRoZSBzZW50ZW5jZSBhdCB0aGUgZW5kIG9mIHRoZSBwYXJhZ3JhcGhcblxuXHRAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcmV0dXJucyB7c3RyaW5nfSDigJQgb3V0cHV0IHdpdGggY29ycmVjdGVkIHNwYWNpbmcgYXJvdW5kIGFwb3Npb3Blc2lzXG4qL1xuZnVuY3Rpb24gY29ycmVjdF9zcGFjZXNfYXJvdW5kX2VsbGlwc2lzKHN0cmluZykge1xuXG5cdC8qIFsxXSBjb3JyZWN0IHNwYWNpbmcsIHdoZW4gZWxsaXBzaXMgdXNlZCB1c2VkIGFyb3VuZCBjb21tYXMgKi9cblx0dmFyIHBhdHRlcm4gPSBcIixbXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdP1wiICsgY29uc3RhbnRzLmVsbGlwc2lzICsgXCJbXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdPyxcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiwg4oCmLFwiKTtcblxuXG5cdC8qIFsyXSBjb3JyZWN0IHNwYWNpbmcgZm9yIGFwb3Npb3Blc2lzIGF0IHRoZSBlbmQgb2YgdGhlIHNlbnRlbmNlXG5cdFx0XHRcdCBpbiB0aGUgbWlkZGxlIG9mIHRoZSBwYXJhZ3JhcGggKi9cblx0cGF0dGVybiA9IFwiKFtcIiArIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIFwiXSkoW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXSkoXCIgKyBjb25zdGFudHMuZWxsaXBzaXMgKyBcIltcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl1bXCIgKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgKyBcIl0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDNcIik7XG5cblxuXHQvKiBbM10gY29ycmVjdCBzcGFjaW5nIGZvciBhcG9zaW9wZXNpcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzZW50ZW5jZVxuXHRcdFx0XHQgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcGFyYWdyYXBoICovXG5cdHBhdHRlcm4gPSBcIihbXCIgKyBjb25zdGFudHMuc2VudGVuY2VQdW5jdHVhdGlvbiArIFwiXVtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl1cIiArIGNvbnN0YW50cy5lbGxpcHNpcyArXCIpKFtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl0pKFtcIiArIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArXCJdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQzXCIpO1xuXG5cblx0LyogWzRdIGNvcnJlY3Qgc3BhY2luZyBmb3IgYXBvc2lvcGVzaXMgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgc2VudGVuY2Vcblx0XHRcdFx0IGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHBhcmFncmFwaCAqL1xuXHRwYXR0ZXJuID0gXCIoXuKApikoW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXSkoW1wiICsgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICsgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICsgXCJdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnbVwiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEkM1wiKTtcblxuXG5cdC8qIFs1XSBjb3JyZWN0IHNwYWNpbmcgZm9yIGFwb3Npb3Blc2lzIGF0IHRoZSBlbmQgb2YgdGhlIHNlbnRlbmNlXG5cdFx0XHRcdCBhdCB0aGUgZW5kIG9mIHRoZSBwYXJhZ3JhcGggKi9cblx0cGF0dGVybiA9IFwiKFtcIiArIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy5zZW50ZW5jZVB1bmN0dWF0aW9uICsgXCJdKShbXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdKShcIiArIGNvbnN0YW50cy5lbGxpcHNpcyArIFwiKSg/IVsgXCIgKyBjb25zdGFudHMuc2VudGVuY2VQdW5jdHVhdGlvbiArIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArIFwiXSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEkM1wiKTtcblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuLypcblx0Q29ycmVjdHMgYWNjaWRlbnRhbCB1cHBlcmNhc2VcblxuXHRCZXN0LWVmZm9ydCBmdW5jdGlvbiB0byBmaXggbW9zdCBjb21tb24gYWNjaWRlbnRhbCB1cHBlcmNhc2UgZXJyb3JzLCBuYW1lbHk6XG5cdFsxXSAyIGZpcnN0IHVwcGVyY2FzZSBsZXR0ZXJzIChpZS4gVVBwZXJjYXNlKVxuXHRbMl0gU3dhcHBlZCBjYXNlcyAoaWUuIHVQUEVSQ0FTRSlcblxuXHRBbGdvcml0aG0gZG9lcyBub3QgZml4IG90aGVyIHVwcGVyY2FzZSBldmVudHVhbGl0aWVzLFxuXHRlLmcuIG1peGVkIGNhc2UgKFVwcEVSY2FTZSkgYXMgdGhlcmUgYXJlIG1hbnkgY2FzZXMgZm9yIGNvcnBvcmF0ZSBicmFuZHNcblx0dGhhdCBjb3VsZCBwb3RlbnRpYWxseSBtYXRjaCB0aGUgYWxnb3JpdGhtIGFzIGZhbHNlIHBvc2l0aXZlLlxuXG5cdEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG5cdEByZXR1cm5zIHtzdHJpbmd9IOKAlCBvdXRwdXQgd2l0aCBjb3JyZWN0ZWQgYWNjaWRlbnRhbCB1cHBlcmNhc2VcbiovXG5mdW5jdGlvbiBjb3JyZWN0X2FjY2lkZW50YWxfdXBwZXJjYXNlKHN0cmluZykge1xuXG5cdC8qIFsxXSB0d28gZmlyc3QgdXBwZXJjYXNlIGxldHRlcnMgKGkuZS4gVVBwZXJjYXNlKSAqL1xuXHR2YXIgcGF0dGVybiA9IFwiW1wiKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgK1wiXXsyLDJ9W1wiKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgK1wiXStcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBmdW5jdGlvbihzdHJpbmcpe1xuXHRcdHJldHVybiAoc3RyaW5nLnN1YnN0cmluZygwLDEpICsgc3RyaW5nLnN1YnN0cmluZygxKS50b0xvd2VyQ2FzZSgpKTtcblx0fSk7XG5cblx0LyogWzIuMV0gU3dhcHBlZCBjYXNlcyAoMi1sZXR0ZXIgY2FzZXMsIGkuZS4gaVQpXG5cdFx0XHROb3RlIHRoYXQgdGhpcyBpcyBkaXZpZGVkIGludG8gMiBzZXBhcmF0ZSBjYXNlcyBhcyBcXGIgaW4gSmF2YVNjcmlwdCByZWdleFxuXHRcdFx0ZG9lcyBub3QgdGFrZSBub24tbGF0aW4gY2hhcmFjdGVycyBpbnRvIGEgY29zbmlkZXJhdGlvblxuXHQqL1xuXHRwYXR0ZXJuID0gXCJbXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArXCJdW1wiKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgK1wiXVxcXFxiXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBmdW5jdGlvbihzdHJpbmcpe1xuXHRcdHJldHVybiAoc3RyaW5nLnN1YnN0cmluZygwLDEpICsgc3RyaW5nLnN1YnN0cmluZygxKS50b0xvd2VyQ2FzZSgpKTtcblx0fSk7XG5cblx0LyogWzIuMl0gU3dhcHBlZCBjYXNlcyAobi1sZXR0ZXIgY2FzZXMsIGkuZS4gdVBQRVJDQVNFKSAqL1xuXHRwYXR0ZXJuID0gXCJbXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArXCJdK1tcIisgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICtcIl17Mix9XCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBmdW5jdGlvbihzdHJpbmcpe1xuXHRcdHJldHVybiAoc3RyaW5nLnN1YnN0cmluZygwLDEpICsgc3RyaW5nLnN1YnN0cmluZygxKS50b0xvd2VyQ2FzZSgpKTtcblx0fSk7XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cblxuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSpcXFxuXHRBYmJyZXZpYXRpb25zXG5cXCotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qXG5cdElkZW50aWZpZXMgZGlmZmVyZW50bHktc3BlbGxlZCBhYmJyZXZpYXRpb25zIGFuZCByZXBsYWNlcyBpdCB3aXRoXG5cdGEgdGVtcCB2YXJpYWJsZSwge3t0eXBvcG9fX1thYmJyXX19XG5cblx0SWRlbnRpZmllcyBnaXZlbiBhYmJyZXZpYXRpb25zOlxuXHRhLm0uLCBwLm0uLCBlLmcuLCBpLmUuXG5cblx0QWxnb3JpdGhtXG5cdFsxXSBJZGVudGlmeSBlLmcuLCBpLmUuXG5cdFsyXSBJZGVudGlmeSBhLm0uLCBwLm0uIChkaWZmZXJlbnQgbWF0Y2ggdG8gYXZvaWQgZmFsc2UgcG9zaXRpdmVzIHN1Y2ggYXM6XG5cdFx0XHRJIGFtLCBIZSBpcyB0aGUgUE0uKVxuXHRbM10gRXhjbHVkZSBmYWxzZSBpZGVudGlmaWNhdGlvbnNcblxuXHRAcGFyYW0ge3N0cmluZ30gaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cblx0QHJldHVybnMge3N0cmluZ30gY29ycmVjdGVkIG91dHB1dFxuKi9cbmZ1bmN0aW9uIGlkZW50aWZ5X2NvbW1vbl9hYmJyZXZpYXRpb25zKHN0cmluZykge1xuXG5cdC8qIFsxXSBJZGVudGlmeSBlLmcuLCBpLmUuICovXG5cdHZhciBhYmJyZXZpYXRpb25zID0gW1wiZWdcIiwgXCJpZVwiXTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhYmJyZXZpYXRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHBhdHRlcm4gPSBcIihcXFxcYltcIiArIGFiYnJldmlhdGlvbnNbaV1bMF0gKyBcIl1cXFxcLj9bXCIrIGNvbnN0YW50cy5zcGFjZXMgK1wiXT9bXCIgKyBhYmJyZXZpYXRpb25zW2ldWzFdICsgXCJdXFxcXC4/KShbXCIrIGNvbnN0YW50cy5zcGFjZXMgK1wiXT8pKFxcXFxiKVwiO1xuXHRcdC8vIGNvbnNvbGUubG9nKHBhdHRlcm4pO1xuXHRcdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnaVwiKTtcblx0XHR2YXIgcmVwbGFjZW1lbnQgPSBcInt7dHlwb3BvX19cIiArIGFiYnJldmlhdGlvbnNbaV0gKyBcIn19IFwiO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG5cdH1cblxuXG5cblxuXHQvKiBbMl0gSWRlbnRpZnkgYS5tLiwgcC5tLiAqL1xuXHRhYmJyZXZpYXRpb25zID0gW1wiYW1cIiwgXCJwbVwiXTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhYmJyZXZpYXRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHBhdHRlcm4gPSBcIihcXFxcZCkoW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXT8pKFxcXFxiW1wiICsgYWJicmV2aWF0aW9uc1tpXVswXSArIFwiXVxcXFwuP1tcIisgY29uc3RhbnRzLnNwYWNlcyArXCJdP1tcIiArIGFiYnJldmlhdGlvbnNbaV1bMV0gKyBcIl1cXFxcLj8pKFtcIisgY29uc3RhbnRzLnNwYWNlcyArXCJdPykoXFxcXGJ8XFxcXEIpXCI7XG5cdFx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdpXCIpO1xuXHRcdHJlcGxhY2VtZW50ID0gXCIkMSB7e3R5cG9wb19fXCIgKyBhYmJyZXZpYXRpb25zW2ldICsgXCJ9fSBcIjtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXHR9XG5cblxuXHQvKiBbM10gRXhjbHVkZSBmYWxzZSBpZGVudGlmaWNhdGlvbnNcblx0XHQgUmVnZXggXFxiIGRvZXMgbm90IGNhdGNoIG5vbi1sYXRpbiBjaGFyYWN0ZXJzIHNvIHdlIG5lZWQgdG8gZXhjbHVkZSBmYWxzZVxuXHRcdCBpZGVudGlmaWNhdGlvbnNcblx0Ki9cblx0YWJicmV2aWF0aW9ucyA9IFtcImVnXCIsIFwiaWVcIiwgXCJhbVwiLCBcInBtXCJdO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFiYnJldmlhdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHQvLyBub24tbGF0aW4gY2hhcmFjdGVyIGF0IHRoZSBiZWdpbm5pbmdcblx0XHR2YXIgcGF0dGVybiA9IFwiKFtcIiArIGNvbnN0YW50cy5ub25MYXRpbkNoYXJzICsgXCJdKSh7e3R5cG9wb19fXCIgKyBhYmJyZXZpYXRpb25zW2ldICsgXCJ9fSlcIjtcblx0XHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0XHRyZXBsYWNlbWVudCA9IFwiJDFcIiArIGFiYnJldmlhdGlvbnNbaV07XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblxuXHRcdC8vIG5vbi1sYXRpbiBjaGFyYWN0ZXIgYXQgdGhlIGVuZFxuXHRcdHBhdHRlcm4gPSBcIih7e3R5cG9wb19fXCIgKyBhYmJyZXZpYXRpb25zW2ldICsgXCJ9fSApKFtcIiArIGNvbnN0YW50cy5ub25MYXRpbkNoYXJzICsgXCJdKVwiO1xuXHRcdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdFx0cmVwbGFjZW1lbnQgPSBhYmJyZXZpYXRpb25zW2ldICsgXCIkMlwiO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG5cdH1cblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuLypcblx0UmVwbGFjZXMgaWRlbnRpZmllZCB0ZW1wIGFiYnJldmlhdGlvbiB2YXJpYWJsZSBsaWtlIHt7dHlwb3BvX19lZ319LFxuXHR3aXRoIHRoZWlyIGFjdHVhbCByZXByZXNlbnRhdGlvblxuXG5cdEBwYXJhbSB7c3RyaW5nfSBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcmV0dXJucyB7c3RyaW5nfSBjb3JyZWN0ZWQgb3V0cHV0XG4qL1xuZnVuY3Rpb24gcGxhY2VfY29tbW9uX2FiYnJldmlhdGlvbnMoc3RyaW5nKSB7XG5cdHZhciBhYmJyZXZpYXRpb25zID0gW1wiZWdcIiwgXCJpZVwiLCBcImFtXCIsIFwicG1cIl07XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYWJicmV2aWF0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBwYXR0ZXJuID0gXCJ7e3R5cG9wb19fXCIgKyBhYmJyZXZpYXRpb25zW2ldICsgXCJ9fVwiO1xuXHRcdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRcdHZhciByZXBsYWNlbWVudCA9IGFiYnJldmlhdGlvbnNbaV1bMF0gKyBcIi5cIiArIGFiYnJldmlhdGlvbnNbaV1bMV0gKyBcIi5cIjtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cblxuXG5cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKlxcXG5cdEV4Y2VwdGlvbnNcblxcKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cbi8qXG5cdElkZW50aWZpZXMgZXhjZXB0aW9ucyB0aGF0IHdpbGwgYmUgb21taXRlZCBmcm9tIGNvcnJlY3Rpb24gb2YgYW55IHNvcnRcblxuXHRBbGdvcml0aG1cblx0WzFdIElkZW50aWZ5IGVtYWlsIGFkcmVzc2VzXG5cdFsyXSBJZGVudGlmeSB3ZWIgVVJMcyBhbmQgSVBzXG5cdFszXSBNYXJrIHRoZW0gYXMgdGVtcG9yYXJ5IGV4Y2VwdGlvbnMgaW4gZm9ybWF0IHt7dHlwb3BvX19leGNlcHRpb24tW2ldfX1cblxuXHRAcGFyYW0ge3N0cmluZ30gaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb24gb2YgZXhjZXB0aW9uc1xuXHRAcmV0dXJucyB7c3RyaW5nfSDigJQgb3V0cHV0IHdpdGggaWRlbnRpZmllZCBleGNlcHRpb25zIGluIGZvcm1hdCB7e3R5cG9wb19fZXhjZXB0aW9uLVtpXX19XG4qL1xuZnVuY3Rpb24gaWRlbnRpZnlfZXhjZXB0aW9ucyhzdHJpbmcpIHtcblxuXHQvKiBbMV0gSWRlbnRpZnkgZW1haWwgYWRyZXNzZXMgKi9cblx0aWRlbnRpZnlfZXhjZXB0aW9uX3NldChzdHJpbmcsIGNvbnN0YW50cy5lbWFpbEFkZHJlc3NQYXR0ZXJuKTtcblxuXG5cdC8qIFsyXSBJZGVudGlmeSB3ZWIgVVJMcyBhbmQgSVBzICovXG5cdGlkZW50aWZ5X2V4Y2VwdGlvbl9zZXQoc3RyaW5nLCBjb25zdGFudHMud2ViVXJsUGF0dGVybik7XG5cblxuXHQvKiBbM10gTWFyayB0aGVtIGFzIHRlbXBvcmFyeSBleGNlcHRpb25zIGluIGZvcm1hdCB7e3R5cG9wb19fZXhjZXB0aW9uLVtpXX19ICovXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZXhjZXB0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciByZXBsYWNlbWVudCA9IFwie3t0eXBvcG9fX2V4Y2VwdGlvbi1cIiArIGkgKyBcIn19XCI7XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoZXhjZXB0aW9uc1tpXSwgcmVwbGFjZW1lbnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cbi8qXG5cdElkZW50aWZpZXMgc2V0IG9mIGV4Y2VwdGlvbnMgZm9yIGdpdmVuIHBhdHRlcm5cblx0VXNlZCBhcyBoZWxwZXIgZnVuY3Rpb24gZm9yIGlkZW50aWZ5X2V4Y2VwdGlvbnMoc3RyaW5nKVxuXG5cdEBwYXJhbSB7c3RyaW5nfSBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvbiBvZiBleGNlcHRpb25zXG5cdEBwYXJhbSB7cGF0dGVybn0gcmVndWxhciBleHByZXNzaW9uIHBhdHRlcm4gdG8gbWF0Y2ggZXhjZXB0aW9uXG4qL1xuZnVuY3Rpb24gaWRlbnRpZnlfZXhjZXB0aW9uX3NldChzdHJpbmcsIHBhdHRlcm4pIHtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHZhciBtYXRjaGVkX2V4Y2VwdGlvbnMgPSBzdHJpbmcubWF0Y2gocmUpO1xuXHRpZiAobWF0Y2hlZF9leGNlcHRpb25zICE9IG51bGwpIHtcblx0XHRleGNlcHRpb25zID0gZXhjZXB0aW9ucy5jb25jYXQobWF0Y2hlZF9leGNlcHRpb25zKTtcblx0fVxufVxuXG5cblxuLypcblx0UmVwbGFjZXMgaWRlbnRpZmllZCBleGNlcHRpb25zIHdpdGggcmVhbCBvbmVzIGJ5IGNoYW5nZSB0aGVpclxuXHR0ZW1wb3JhcnkgcmVwcmVzZW50YXRpb24gaW4gZm9ybWF0IHt7dHlwb3BvX19leGNlcHRpb24tW2ldfX0gd2l0aCBpdHNcblx0Y29ycmVzcG9uZGluZyByZXByZXNlbnRhdGlvblxuXG5cdEBwYXJhbSB7c3RyaW5nfSBpbnB1dCB0ZXh0IHdpdGggaWRlbnRpZmllZCBleGNlcHRpb25zXG5cdEByZXR1cm5zIHtzdHJpbmd9IG91dHB1dCB3aXRoIHBsYWNlZCBleGNlcHRpb25zXG4qL1xuZnVuY3Rpb24gcGxhY2VfZXhjZXB0aW9ucyhzdHJpbmcpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBleGNlcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHBhdHRlcm4gPSBcInt7dHlwb3BvX19leGNlcHRpb24tXCIgKyBpICsgXCJ9fVwiXG5cdFx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdFx0dmFyIHJlcGxhY2VtZW50ID0gZXhjZXB0aW9uc1tpXTtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cblxuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSpcXFxuXHRNYWluIHNjcmlwdFxuXFwqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblxuXG4vKlxuXHRDb3JyZWN0IHR5cG9zIGluIHRoZSBwcmVkZWZpbmVkIG9yZGVyXG5cblxuXHRAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBjb3JyZWN0aW9uXG5cdEBwYXJhbSB7bGFuZ3VhZ2V9IHN0cmluZyDigJQgbGFuZ3VhZ2Ugb3B0aW9uIHRvIGNvcnJlY3Qgc3BlY2lmaWMgdHlwb3M7IHN1cHBvcnRlZCBsYW5ndWFnZXM6IGVuLCBzaywgY3MsIHJ1ZS4gaWYgbm90IHNwZWNpZmllZCwgRW5nbGlzaCB0eXBvcyBhcmUgY29ycmVjdGVkXG5cdEBwYXJhbSB7cmVtb3ZlX2xpbmVzfSBib29sZWFuIOKAlCBvcHRpb25hbCBwYXJhbWV0ZXIgYWxsb3dpbmcgeW91IHRvIGNob29zZSB3aGV0aGVyIHRvIHJlbW92ZSBlbXB0eSBsaW5lcyBvciBub3Rcblx0QHJldHVybnMge3N0cmluZ30g4oCUIGNvcnJlY3RlZCBvdXRwdXRcbiovXG5leHBvcnQgZnVuY3Rpb24gY29ycmVjdF90eXBvcyhzdHJpbmcsIGxhbmd1YWdlLCBjb25maWd1cmF0aW9uKSB7XG5cdGxhbmd1YWdlID0gKHR5cGVvZiBsYW5ndWFnZSA9PT0gXCJ1bmRlZmluZWRcIikgPyBcImVuXCIgOiBsYW5ndWFnZTtcblxuXHRjb25maWd1cmF0aW9uID0gKHR5cGVvZiBjb25maWd1cmF0aW9uID09PSBcInVuZGVmaW5lZFwiKSA/IHtcblx0XHRyZW1vdmVMaW5lcyA6IHRydWUsXG5cdH0gOiBjb25maWd1cmF0aW9uO1xuXG5cdHN0cmluZyA9IGlkZW50aWZ5X2V4Y2VwdGlvbnMoc3RyaW5nKTtcblx0c3RyaW5nID0gaWRlbnRpZnlfY29tbW9uX2FiYnJldmlhdGlvbnMoc3RyaW5nKTsgLy8gbmVlZHMgdG8gZ28gYmVmb3JlIHB1bmN0dWF0aW9uIGZpeGVzXG5cblx0c3RyaW5nID0gcmVwbGFjZVN5bWJvbHMoc3RyaW5nKTtcblx0c3RyaW5nID0gcmVwbGFjZV9wZXJpb2RzX3dpdGhfZWxsaXBzaXMoc3RyaW5nKTtcblx0c3RyaW5nID0gcmVtb3ZlX211bHRpcGxlX3NwYWNlcyhzdHJpbmcpO1xuXG5cblx0c3RyaW5nID0gY29ycmVjdF9kb3VibGVfcXVvdGVzX2FuZF9wcmltZXMoc3RyaW5nLCBsYW5ndWFnZSk7XG5cdHN0cmluZyA9IGNvcnJlY3Rfc2luZ2xlX3F1b3Rlc19wcmltZXNfYW5kX2Fwb3N0cm9waGVzKHN0cmluZywgbGFuZ3VhZ2UpO1xuXG5cdHN0cmluZyA9IGNvcnJlY3RfbXVsdGlwbGVfc2lnbihzdHJpbmcpO1xuXG5cdHN0cmluZyA9IHJlbW92ZV9zcGFjZV9iZWZvcmVfcHVuY3R1YXRpb24oc3RyaW5nKTtcblx0c3RyaW5nID0gcmVtb3ZlX3NwYWNlX2FmdGVyX3B1bmN0dWF0aW9uKHN0cmluZyk7XG5cdHN0cmluZyA9IHJlbW92ZV90cmFpbGluZ19zcGFjZXMoc3RyaW5nKTtcblx0c3RyaW5nID0gYWRkX3NwYWNlX2JlZm9yZV9wdW5jdHVhdGlvbihzdHJpbmcpO1xuXHRzdHJpbmcgPSBhZGRfc3BhY2VfYWZ0ZXJfcHVuY3R1YXRpb24oc3RyaW5nKTtcblx0c3RyaW5nID0gcmVtb3ZlX3NwYWNlc19hdF9wYXJhZ3JhcGhfYmVnaW5uaW5nKHN0cmluZyk7XG5cblx0aWYoY29uZmlndXJhdGlvbi5yZW1vdmVMaW5lcykge1xuXHRcdHN0cmluZyA9IHJlbW92ZUVtcHR5TGluZXMoc3RyaW5nKTtcblx0fVxuXG5cdHN0cmluZyA9IGNvbnNvbGlkYXRlX25ic3Aoc3RyaW5nKTtcblx0c3RyaW5nID0gY29ycmVjdF9zcGFjZXNfYXJvdW5kX2VsbGlwc2lzKHN0cmluZyk7XG5cblx0c3RyaW5nID0gcmVwbGFjZV9oeXBoZW5fd2l0aF9kYXNoKHN0cmluZywgbGFuZ3VhZ2UpO1xuXHRzdHJpbmcgPSByZXBsYWNlX2Rhc2hfd2l0aF9oeXBoZW4oc3RyaW5nKTtcblxuXHRzdHJpbmcgPSBjb3JyZWN0X2FjY2lkZW50YWxfdXBwZXJjYXNlKHN0cmluZyk7XG5cblx0c3RyaW5nID0gcGxhY2VfY29tbW9uX2FiYnJldmlhdGlvbnMoc3RyaW5nKTsgLy8gbmVlZHMgdG8gZ28gYWZ0ZXIgcHVuY3R1YXRpb24gZml4ZXNcblx0c3RyaW5nID0gcGxhY2VfZXhjZXB0aW9ucyhzdHJpbmcpO1xuXG5cdHN0cmluZyA9IHJlcGxhY2VfcGVyaW9kc193aXRoX2VsbGlwc2lzKHN0cmluZyk7XG5cblx0cmV0dXJuIHN0cmluZztcbn1cbiJdfQ==

//# sourceMappingURL=maps/typopo_browser.built.js.map
