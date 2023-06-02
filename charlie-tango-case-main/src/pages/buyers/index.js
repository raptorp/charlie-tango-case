import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./Buyers.module.css";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://bqrgmrkchdfdioocsrdc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxcmdtcmtjaGRmZGlvb2NzcmRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU2NzQ2NTcsImV4cCI6MjAwMTI1MDY1N30.dKDdwDp2xhkv2wmZ3449bMjv3jx-oFuXH31oIM9_um4"
);

export default function Buyers() {
  const [buyers, setBuyers] = useState([]);
  const { query } = useRouter();

  useEffect(() => {
    if (query && query.zipCode)
      fetch(
        `/api/find-buyers?zipCode=${query.zipCode}&propertyType=${query.propertyType}&price=${query.price}&size=${query.size}`
      )
        .then((res) => res.json())
        .then((data) => setBuyers(data));
  }, [query]);

  const submitToSupa = async (event) => {
    console.log(event);
    event.preventDefault();
    let contact = (
      await supabase
        .from("contacts")
        .insert({
          name: event.target.name.value,
          email: event.target.email.value,
          phone: event.target.phone.value,
          consent: event.target.consent.value,
          price: query.price,
          estatetype: query.propertyType,
          size: query.size,
          zip: query.zipCode,
          inserted_at: Date.now(),
        })
        .select()
    ).data[0];
    console.log(contact);
    for (let buyer of buyers) {
      if (buyer.selected) {
        await supabase.from("buyers").insert({
          contactid: contact.id,
          maxprice: buyer.maxPrice,
          minsize: buyer.minSize,
          adults: buyer.adults,
          children: buyer.children,
          description: buyer.description,
          estatetype: buyer.estateType,
          takeoverdate: buyer.takeOverDate,
        });
      }
    }
  };
  return (
    <>
      <Head>
        <title>Find buyer | EDC</title>
      </Head>
      <h1 className={styles.headline}>Potential buyers</h1>
      <div className={styles.container}>
        <div className={styles.buyersLayout}>
          {buyers.map((buyer) => (
            <div className={styles.buyerCard}>
              <span>{buyer.description}</span>
              <div className={styles.addToList}>
                <input
                  name={buyer.id}
                  type="checkbox"
                  onChange={(event) =>
                    (buyer.selected = event.currentTarget.checked)
                  }
                />
                <span>Contact this buyer</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.formCont}>
          <form onSubmit={submitToSupa} className={styles.form}>
            <label className={styles.formInput}>
              <span className={styles.label}>Name</span>
              <input name="name" type="text" required />
            </label>
            <label className={styles.formInput}>
              <span className={styles.label}>Email</span>
              <input name="email" type="text" required />
            </label>
            <label className={styles.formInput}>
              <span className={styles.label}>Phone</span>
              <input name="phone" type="text" required />
            </label>
            <label className={styles.formInput}>
              <input name="consent" type="checkbox" required />
              <span className={styles.label}>Yes, call me</span>
            </label>
            <button className={styles.button}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
