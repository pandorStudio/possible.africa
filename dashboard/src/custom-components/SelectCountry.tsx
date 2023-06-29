import { Select } from "antd";
import { useEffect, useState } from "react";
import { axiosInstance } from "../authProvider";

export default function SelectCountry() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (!countries.length) {
      // Get all countries from api
      axiosInstance.get(`https://restcountries.com/v3.1/all`).then((res) => {
        const countrieDatas = res.data;
        // Filter countries by alphabetic order
        countrieDatas.sort((a: any, b: any) =>
          a.name.common > b.name.common ? 1 : -1
        );
        setCountries(countrieDatas);
      });
    }
  }, [countries]);
  return (
    <Select>
      {countries.map((country) => (
        <Select.Option value={country.name.common}>
          {country.name.common}
        </Select.Option>
      ))}
    </Select>
  );
}
