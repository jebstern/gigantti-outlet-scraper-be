/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
const Router = require('express').Router
const router = Router()
const axios = require('axios').default
import * as cheerio from 'cheerio'
import * as _ from 'lodash'
import { Request, Response } from 'express'
// Since the remote website is deprecated & removed, this html
// will replaced the content
import {
  UUSIMMAT,
  KUVA,
  AANI,
  TIETOKONEET,
  PUHELIMET,
  KAMERA,
  KODINKONEET,
  PIENKONEET,
  PELIT,
} from '../products'

const getProducts = (url: string): any => {
  const $ = cheerio.load(url)
  const products = [] as any[]
  $('.col1and2 .content')
    .children()
    .each(function (i, elem) {
      let title = $(this).find('.infos .description').text()
      let added = $(this).find('.infos .date').text()
      let store = $(this).find('.infos .store').text().replace('Myyjä: ', '')
      var sale = $(this)
        .find('.prices .sale')
        .text()
        .replace('Outlet-hinta', '')
      var normal = $(this)
        .find('.prices .normal')
        .text()
        .replace('Norm. hinta', '')
      var percent = parseInt(
        $(this)
          .find('.prices .percent')
          .text()
          .replace('Ale-%-', '')
          .replace(' %', '')
      )
      var link = $(this).find('.infos .button.blue').attr('href')

      let product = {
        title,
        added,
        store,
        sale,
        normal,
        percent,
        link,
      }
      products.push(product)
    })
  let ordered = _.orderBy(products, ['percent'], ['desc'])
  return ordered
}

router.get(
  '/uusimmat',
  async (req: Request, res: Response): Promise<Response> => {
    const url = 'https://gigantti3.weboutlet.fi/outlet/?myymala=0&kategoria=0'
    const products = getProducts(UUSIMMAT)
    return res.status(200).json({ products })
  }
)

router.get(
  '/kuva',
  async (req: Request, res: Response): Promise<Response> => {
    const url = 'https://gigantti3.weboutlet.fi/outlet/?myymala=0&kategoria=1'
    const products = getProducts(KUVA)
    return res.status(200).json({ products })
  }
)

router.get(
  '/aani',
  async (req: Request, res: Response): Promise<Response> => {
    const url = 'https://gigantti3.weboutlet.fi/outlet/?myymala=0&kategoria=8'
    const products = getProducts(AANI)
    return res.status(200).json({ products })
  }
)

router.get(
  '/tietokoneet',
  async (req: Request, res: Response): Promise<Response> => {
    const url = 'https://gigantti3.weboutlet.fi/outlet/?myymala=0&kategoria=2'
    const products = getProducts(TIETOKONEET)
    return res.status(200).json({ products })
  }
)

router.get(
  '/puhelimet',
  async (req: Request, res: Response): Promise<Response> => {
    const url = 'https://gigantti3.weboutlet.fi/outlet/?myymala=0&kategoria=3'
    const products = getProducts(PUHELIMET)
    return res.status(200).json({ products })
  }
)

router.get(
  '/kamera',
  async (req: Request, res: Response): Promise<Response> => {
    const url = 'https://gigantti3.weboutlet.fi/outlet/?myymala=0&kategoria=4'
    const products = getProducts(KAMERA)
    return res.status(200).json({ products })
  }
)

router.get(
  '/kodinkoneet',
  async (req: Request, res: Response): Promise<Response> => {
    const url = 'https://gigantti3.weboutlet.fi/outlet/?myymala=0&kategoria=5'
    const products = getProducts(KODINKONEET)
    return res.status(200).json({ products })
  }
)

router.get(
  '/pienkoneet',
  async (req: Request, res: Response): Promise<Response> => {
    console.log('/pienkoneet')
    const url = 'https://gigantti3.weboutlet.fi/outlet/?myymala=0&kategoria=6'
    const products = getProducts(PIENKONEET)
    return res.status(200).json({ products })
  }
)

router.get(
  '/pelit',
  async (req: Request, res: Response): Promise<Response> => {
    const url = 'https://gigantti3.weboutlet.fi/outlet/?myymala=0&kategoria=7'
    const products = getProducts(PELIT)
    return res.status(200).json({ products })
  }
)

export default router
