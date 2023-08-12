import { Fragment, useEffect } from "react"
import Menu from "../Menu/Menu"

const Dashboard = () => {
  let userDetail = { id: 1, name:'shivam',token:'shfdjkhsfnsndfm,'}
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userDetail));
  },[])

    return (
      <Fragment>
       
        <div className="mt-2">Dashboard</div>
      </Fragment>
    );
}

export default Dashboard