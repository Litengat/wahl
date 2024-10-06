/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import axios from "axios";

// Ensure WBK is correctly typed

export default async function main() {
  const response = await axios.get(
    "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q42&format=json&languages=en",
  );
}
//https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q42&format=json&languages=en

// Ensure WBK is correctly typed

// Example usage of wdk to avoid 'assigned a value but never used' error
