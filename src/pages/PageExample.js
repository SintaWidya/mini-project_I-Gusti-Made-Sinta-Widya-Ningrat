import React, { useEffect } from "react";
import UseGetAllMapel from "../lib/hook/UseGetAllMapel";
import UseGetAllStudent from "../lib/hook/useGetAllStudent";

export default function PageExample() {
  //pakek useQuery Saja
  const { data, error, loading } = UseGetAllMapel();
  console.log(data);

  //pakek useLazyQuery
  const { getData, data: data1, loading: loading1 } = UseGetAllStudent();
  useEffect(() => {
    getData(); //ngambil data
  }, []);
  console.log(data1);

  if (loading || loading1) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <div>
        Data Query Biasa
        <hr />
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
      <div>
        <hr />
        Data useLazyQuery
        <hr />
        <div>
          <pre>{JSON.stringify(data1, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
