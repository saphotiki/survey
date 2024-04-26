import React from "react";
import { Link } from "react-router-dom";

export default function Header(){
return (
    <nav>
  <ul>
    <li><strong>_Surveys</strong></li>
  </ul>
  <ul>
    <li><Link to="/">FILL OUT SURVEY</Link></li>
    <li><Link to="/result">VIEW SURVEY RESULTS</Link></li>
  </ul>
</nav>
);
}
