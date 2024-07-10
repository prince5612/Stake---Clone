import React from 'react'

export default function Navbar({toggleSidebar}) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <img src="/imgs/menu.png" alt="" style={{'height' : '30px' , 'paddingLeft' : '1rem' , 'width' : '45px'} }  onClick={toggleSidebar}/>
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Stake</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item ">
            {/* <div class="slds-button-group" role="group">
            <button class="slds-button slds-button_neutral ">Refresh</button>
            <button class="slds-button slds-button_neutral ">Save</button> */}
            {/* </div> */}
            <a className="nav-link " aria-current="page" aria-disabled="true" style={{'border' : '1px solid grey' , 'paddingLeft' :'25px' , 'paddingRight' : '25px'  , 'borderRadius' : '5px 0px 0px 5px' , 'fontSize' : '15px' , 'marginLeft' : '500px' ,'borderWidth' : '1px 0px 1px 1px'}}>$1.00</a>
            
        </li>
        <button type="button" class="btn btn-primary" style={{'fontSize' : '14px' ,'borderRadius' : '0px 5px 5px 0px' }}>Wallet</button>
      </ul>
       <i class="fa-solid fa-user" style={{ color: "#ffffff" }}></i>
    </div>
  </div>
</nav>
    </div>
  )
}
