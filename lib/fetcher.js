"use client"
export const fetcher = (url)=>fetch(url).then((res)=>res.json());