
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useClerk } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
export default function Checkout() {
    const [Books, setBooks] = useState([])
    const { session } = useClerk();
    async function fetchAllBooks() {
        const url = 'http://localhost:8080/Bookcom/orders/getBooks';
        const jwt_token = await session.getToken();
  
        axios
          .get(url, { headers: { Authorization: `Bearer ${jwt_token}` } })
          .then((response) => {
            setBooks(response.data);
          })
          .catch((error) => console.error('Error fetching image:', error));
      }
      async function deleteBook(bookId) {
        const url = `http://localhost:8080/Bookcom/orders/deleteOrder?id=${bookId}`;
        const jwt_token = await session.getToken();
        
        axios
          .delete(url, { headers: { Authorization: `Bearer ${jwt_token}` } })
          .then((response) => {
            setBooks((prevUrls) => prevUrls.filter((item) => item[0] !== bookId));
          })
          .catch((error) => console.error('Error fetching image:', error));
      }
    useEffect(() => {
      fetchAllBooks();
    }, [])
    
  return (
    <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>
  
      <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
        <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
          <div class="space-y-6">
            
            {Books.length!==0 ? Books.map((item,index)=>{
                return(
                <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6" key={index}>
                <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                  <a href="#" class="shrink-0 md:order-1">
                    <img class="h-20 w-20 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                    <img class="hidden h-20 w-20 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                  </a>
    
                  <div class="flex items-center justify-between md:order-3 md:justify-end">
                   
                    <div class="text-end md:order-4 md:w-32">
                      <p class="text-base font-bold text-gray-900 dark:text-white">{item[4]}</p>
                    </div>
                  </div>
    
                  <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <Link to={"#"} class="text-base font-medium text-gray-900 hover:underline dark:text-white">{item[0]}|{item[1]}|{item[2]}|{item[3]}</Link>
    
                    <div class="flex items-center gap-4">
                      
    
                      <button type="button" class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500" onClick={()=>deleteBook(item[0])}>
                        <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
                )
            }):<>No Items present..</>}
            

          </div>
         
        </div>
  
        <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
          <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
            <p class="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
  
            <div class="space-y-4">
              <div class="space-y-2">
                <dl class="flex items-center justify-between gap-4">
                  <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                  <dd class="text-base font-medium text-gray-900 dark:text-white">$7,592.00</dd>
                </dl>
  
                <dl class="flex items-center justify-between gap-4">
                  <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                  <dd class="text-base font-medium text-green-600">-$299.00</dd>
                </dl>
  
                <dl class="flex items-center justify-between gap-4">
                  <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                  <dd class="text-base font-medium text-gray-900 dark:text-white">$99</dd>
                </dl>
  
                <dl class="flex items-center justify-between gap-4">
                  <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                  <dd class="text-base font-medium text-gray-900 dark:text-white">$799</dd>
                </dl>
              </div>
  
              <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                <dd class="text-base font-bold text-gray-900 dark:text-white">$8,191.00</dd>
              </dl>
            </div>
  
            <a href="#" class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</a>
  
            <div class="flex items-center justify-center gap-2">
              <span class="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
              <a href="#" title="" class="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                Continue Shopping
                <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                </svg>
              </a>
            </div>
          </div>
  
          
        </div>
      </div>
    </div>
  </section>
  )
}
