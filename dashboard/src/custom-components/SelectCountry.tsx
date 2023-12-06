import { Select } from "antd";
import { useEffect, useState } from "react";
import { axiosInstance } from "../authProvider";

export default function SelectCountry(props) {
  const [countries, setCountries] = useState([]);
  const existingCountry = props.country;
  useEffect(() => {
    if (!countries.length) {
      // Get all countries from api
      axiosInstance
        .get(`https://restcountries.com/v3.1/all`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          const countrieDatas = res.data;
          // Filter countries by alphabetic order
          countrieDatas.sort((a: any, b: any) =>
            a.translations?.fra?.common > b.translations?.fra?.common ? 1 : -1
          );
          setCountries(countrieDatas);
        });
    }
  }, [countries]);
  return (
    <Select defaultValue={existingCountry}>
      {countries.map((country) => (
        <Select.Option value={country?.translations?.fra?.common}>
          {country?.translations?.fra?.common}
        </Select.Option>
      ))}
    </Select>
  );
}
