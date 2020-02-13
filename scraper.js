const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://gigantti3.weboutlet.fi/outlet/?myymala=0&kategoria=1';

axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    $('.col1and2 .content').children().each(function(i, elem) {
      let title = $(this).find('.infos .description').text()
      let added = $(this).find('.infos .date').text()
      let store = $(this).find('.infos .store').text().replace('Myyjä: ','');
      var sale = $(this).find('.prices .sale').text().replace('Outlet-hinta','');
      var normal = $(this).find('.prices .normal').text().replace('Norm. hinta','');
      var percent = $(this).find('.prices .percent').text().replace('Ale-%-','').replace(' %','');
      var link = $(this).find('.infos .button.blue').attr('href');
      console.log(link);
    });
  })
  .catch(console.error);