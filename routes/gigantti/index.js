const Router = require("express").Router;
const router = Router()
const axios = require("axios")
const cheerio = require("cheerio")
const _ = require("lodash")

router.get('/uusimmat', async(req, res) => {
  const url = 'https://gigantti3.weboutlet.fi/outlet/?myymala=0&kategoria=0';
  const products = await getProducts(url)
  return res.status(200).json({ products })
});

router.get('/kuva', async(req, res) => {
  const url = 'https://gigantti3.weboutlet.fi/outlet/?myymala=0&kategoria=1';
  const products = await getProducts(url)
  return res.status(200).json({ products })
});

router.get('/aani', async(req, res) => {
  const url = 'https://gigantti3.weboutlet.fi/outlet/?myymala=0&kategoria=8';
  const products = await getProducts(url)
  return res.status(200).json({ products })
});

router.get('/tietokoneet', async(req, res) => {
  const url = 'https://gigantti3.weboutlet.fi/outlet/?myymala=0&kategoria=2';
  const products = await getProducts(url)
  return res.status(200).json({ products })
});

router.get('/puhelimet', async(req, res) => {
  const url = 'https://gigantti3.weboutlet.fi/outlet/?myymala=0&kategoria=3';
  const products = await getProducts(url)
  return res.status(200).json({ products })
});

router.get('/kamera', async(req, res) => {
  const url = 'https://gigantti3.weboutlet.fi/outlet/?myymala=0&kategoria=4';
  const products = await getProducts(url)
  return res.status(200).json({ products })
});

router.get('/kodinkoneet', async(req, res) => {
  const url = 'https://gigantti3.weboutlet.fi/outlet/?myymala=0&kategoria=5';
  const products = await getProducts(url)
  return res.status(200).json({ products })
});

router.get('/pienkoneet', async(req, res) => {
  console.log('/pienkoneet')
  const url = 'https://gigantti3.weboutlet.fi/outlet/?myymala=0&kategoria=6';
  const products = await getProducts(url)
  return res.status(200).json({ products })
});

router.get('/pelit', async(req, res) => {
  const url = 'https://gigantti3.weboutlet.fi/outlet/?myymala=0&kategoria=7';
  const products = await getProducts(url)
  return res.status(200).json({ products })
});

const getProducts = async(url) => {
  return await axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const products = []
    $('.col1and2 .content').children().each(function(i, elem) {
      let title = $(this).find('.infos .description').text()
      let added = $(this).find('.infos .date').text()
      let store = $(this).find('.infos .store').text().replace('Myyjä: ','');
      var sale = $(this).find('.prices .sale').text().replace('Outlet-hinta','');
      var normal = $(this).find('.prices .normal').text().replace('Norm. hinta','');
      var percent = parseInt($(this).find('.prices .percent').text().replace('Ale-%-','').replace(' %',''));
      var link = $(this).find('.infos .button.blue').attr('href');

      let product = {
        title,
        added,
        store,
        sale,
        normal,
        percent,
        link
      }
      products.push(product)
    });
    let ordered = _.orderBy(products, ['percent'],['desc'])
    return ordered
  })
  .catch((error) => next(error));
}

module.exports = router;
