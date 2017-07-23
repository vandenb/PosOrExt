// todo: spaties uit partUrl kieperen, wanneer door gebruiker ingevuld
// verwijzing aanpassen, zoals jaspert opmerkte


// globale variabele
var origUrl = '';
var partUrl = '';



// Voer script uit zodra de pagina helemaal geladen is.
window.onload = function() {


		// caching van HTML-elementen in variabele
		var divResult = document.getElementById('divResult');

		//    https://financialfocus.abnamro.nl/schenken/schenkingsvrijstelling-eigen-woning-eerste-ervaringen/
		//    https://www.abnamro.nl/nl/privatebanking/plx-private-livexpert/index.html

		/*  === VOOR HET DATUM DEEL   ===*/

		/* dit stukje code online gevonden, om het weeknummer te noemen */
		Date.prototype.getWeek = function() {
			var onejan = new Date(this.getFullYear(), 0, 1);
			return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
		}


		var date = new Date();
		var year = date.getFullYear();
		var weekNumber = date.getWeek();
		var dayName = date.getDay();
		var weekDay = dayName;


		switch (weekDay) {
			case 0:
				weekDay = 'zo';
				break;
			case 1:
				weekDay = 'ma';
				break;
			case 2:
				weekDay = 'di';
				break;
			case 3:
				weekDay = 'wo';
				break;
			case 4:
				weekDay = 'do';
				break;
			case 5:
				weekDay = 'vr';
				break;
			case 6:
				weekDay = 'za';
				break;
			default:
				weekDay = 'x';
				break;
		}

		/*  ===== EINDE DATUMDEEL ===== */


		// event handler voor de knop
		document.getElementById('btnKnop1').addEventListener('click', function() {
			origUrl = document.getElementById('txtUrl').value;
			choice = document.querySelectorAll('input[type="radio"][name="radioGroup"]:checked')[0].value;

			/*  ===== HIER WORDT HET LAATST DEEL VAN DE URL BEHANDELD  ===== */

			if (origUrl.includes("financialfocus")) { /* test op FF */
				var splitUrl = origUrl.split("/"); /* split op de slash, maak een array  */
				if (splitUrl[splitUrl.length - 1] === '') { /* klopt het?  urls van ff eindigen op / en die is nu weg */
					partUrl = splitUrl[splitUrl.length - 2]; /* pak dan het eennalaatste ding in de array, */
				} else {
					partUrl = prompt('Wat is het onderwerp waarop je je pos terug wil kunnen vinden?');
				} /* gekke url voor ff */
			} else if (origUrl.includes("abnamro") === true && (origUrl.includes("financialfocus") === false))
			/* test op aamp zonder ff   */
			{
				var splitUrl = origUrl.split("/"); /* split op de slash, maak een array  */
				if (splitUrl[splitUrl.length - 1] === '') { /* dan is het een url zonder x.html */
					partUrl = splitUrl[splitUrl.length - 2]; /* pak dan het eennalaatste ding in de array*/
				} else if (splitUrl[splitUrl.length - 1].includes("index.html")) { /* is het index.html?*/
					partUrl = splitUrl[splitUrl.length - 2]; /* pak dan de slug voor dat deel */
				} else if (splitUrl[splitUrl.length - 1].includes("html") === true && (splitUrl[splitUrl.length - 1].includes("index") === false))
				/* Deze kijkt of er een slug is met wel .html, maar geen index, dus een gekkenaam.html */
				{
					var nameDotHtml = splitUrl[splitUrl.length - 1].split(".");
					/* stop die gekkenaam.html hierin en split hem op de . */
					partUrl = splitUrl[splitUrl.length - 2] + '-' + nameDotHtml[nameDotHtml.length - 2];
					/* voeg laatste deel slug en gekkenaam samen */
				} else {
					partUrl = prompt('Wat is het onderwerp waarop je je pos terug wil kunnen vinden?');
				} /* gekke url voor aamp */
			} else {
				partUrl = prompt('Wat is het onderwerp waarop je je pos terug wil kunnen vinden?');
			} /* gekke url die me helemaal niet bekend voorkomt */

			/*  ===== EINDE VAN EINDE URL BEHANDELD  ===== */

			//    https://financialfocus.abnamro.nl/schenken/schenkingsvrijstelling-eigen-woning-eerste-ervaringen/
			//    https://www.abnamro.nl/nl/privatebanking/plx-private-livexpert/index.html

			/* ====== HIER GAAN WE DE COMPLETE URLS TONEN ===== */


			if (choice == 'aamp-ff-ct-home') {

				divResult.innerHTML = '<div class="result">' + origUrl + '?pos=pb_aamp-ff_ct-home_' + year + '-wk' + weekNumber + '-' + weekDay + '_' + partUrl + '</div>';

			} else if (choice == 'aamp-ff-uitlog') {

				divResult.innerHTML = '<div class="result">' + origUrl + '?pos=pb_aamp-ff_uitlog_cgc-alg_' + year + '-wk' + weekNumber + '-' + weekDay + '_' + partUrl + '</div>'
				+ '<div class="explanation">Let op: voor de uitlogpagina moet je alg bij iedere cgc-groep vervangen door het equivalent.</div>';

			} else if (choice == 'social') {

				divResult.innerHTML = '<div class="result">' + origUrl + '?ext=tw_pb_social_twitter-ff_' + year + '-wk' + weekNumber + '-' + weekDay + '_' + partUrl + '<br />'
				+ origUrl + '?ext=li_pb_social_linkedin-ff_' + year + '-wk' + weekNumber + '-' + weekDay + '_' + partUrl + '</div>';

			} else {

			divResult.innerHTML = '<div class="result">Daar ging iets mis.</div>';

			}


		}, false);

	} // einde window.onload
