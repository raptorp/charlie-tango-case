import { createClient } from "@supabase/supabase-js";
import styles from "../Home.module.css";
import { useEffect, useState } from "react";
import Head from "next/head";

const supabase = createClient(
  "https://bqrgmrkchdfdioocsrdc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxcmdtcmtjaGRmZGlvb2NzcmRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU2NzQ2NTcsImV4cCI6MjAwMTI1MDY1N30.dKDdwDp2xhkv2wmZ3449bMjv3jx-oFuXH31oIM9_um4"
);

export default function handler(req, res) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    supabase
      .from("contacts")
      .select()
      .then(async (c) => {
        let data = [];
        for (let d of c.data) {
          console.log(d.id);
          d.buyers = (
            await supabase
              .from("buyers")
              .select()
              .eq("contactid", d.id)
              .select()
          ).data;
          data.push(d);
        }
        data.sort((a, b) => b.inserted_at - a.inserted_at);
        console.log(data);
        setContacts(data);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard | EDC</title>
      </Head>
      <h1 className={styles.headline}>Potential buyers</h1>
      <div className={styles.dataCont}>
        <div className={styles.dataHeader}>
          <p className={styles.rowItem}>Name</p>
          <p className={styles.rowItem}>Email</p>
          <p className={styles.rowItem}>Phone</p>
          <p className={styles.rowItem}>Price</p>
          <p className={styles.rowItem}>Type</p>
          <p className={styles.rowItem}>Size</p>
          <p className={styles.rowItem}>Zip code</p>
          <p className={styles.rowItem}>Buyer ID(s)</p>
        </div>

        {contacts.map((contact) => (
          <div className={styles.dataRow}>
            <p className={styles.rowItem}>{contact.name}</p>
            <p className={styles.rowItem}>{contact.email}</p>
            <p className={styles.rowItem}>{contact.phone}</p>

            <p className={styles.rowItem}>{contact.price}</p>
            <p className={styles.rowItem}>{contact.estatetype}</p>
            <p className={styles.rowItem}>{contact.size}</p>
            <p className={styles.rowItem}>{contact.zip}</p>
            <p className={styles.idList}>
              {contact.buyers.map((buyer) => (
                <p className={styles.singleId}>{buyer.id}</p>
              ))}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
