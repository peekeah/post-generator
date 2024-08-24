"use client"
import { useEffect, useState } from "react";

import { Table, TableBody, TableCaption, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";

type TPrompts = string[][];

const History = () => {

  const [prompts, setPrompts] = useState<TPrompts>([]);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async() => {
    try {
      const res = await fetch("api/sheet")
      const data = await res.json();
      if(data?.status){
        setPrompts(() => data?.data.slice(1))
      }
    } catch (err) {
      console.log("err", err)
    }
  }

  const formatDate = (date: string) => {
    try {
      const parsedDate = new Date(date);
      return parsedDate?.toUTCString();
    } catch (err) {
      return ""
    }
  }

  return (
    <div className="container mx-auto m-9 py-5">
      <Table>
        <TableCaption>Prompts search history</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Sr no</TableHead>
            <TableHead>Prompt</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            prompts?.length ? prompts?.map((el, id) => (
              <TableRow key={id}>
                <TableCell>{id + 1}</TableCell>
                <TableCell>{el?.[0]}</TableCell>
                <TableCell>{el?.[1]}</TableCell>
                <TableCell>{formatDate(el?.[2])}</TableCell>
              </TableRow>
            )) : null
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default History;
