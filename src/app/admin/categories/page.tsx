import { getCategoriesWithProducts } from "@/actions/categories"

import CategoriesPageComponent from '../categories/page-component'


export default async function Categories() {


  const categories = await getCategoriesWithProducts()
  // console.log('categories:::', categories)


  return <CategoriesPageComponent categories={categories} />
}