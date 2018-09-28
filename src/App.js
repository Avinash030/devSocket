import React from 'react'
import socketIOClient from "socket.io-client";
import './css/custom.css'
export default class View extends React.Component{
    constructor(){
        super()
        this.state={
            timestamp: [],
            endpoint: "http://socket.zecoex.com/",
            currencyTypes:"ANY",
            item:[],
            search:"",
            symbol:"",
            selectedOption :null,
            color:"green",
            filterFiat:"ANY"
        }
        this.colour="green"
        this.pData = [];
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("client", data =>{ this.setState({timestamp:data})
        // console.log(data)
      });

      
    }
    
        handleChange=({target})=>{
        this.setState({filterFiat:target.value, [target.name]:target.value})
        }
        // handleInput=({target})=>{
        //   this.setState({[target.name]:target.value})
        //   let data = this.state.timestamp.filter(x=>x.fSymbol === this.state.symbol)
        //   if(this.state.symbol === "" || this.state.symbol === "ANY")
        //   data = this.state.timestamp
        //    let fdata = data.filter(x=> x.cSymbol.toLowerCase().includes(target.value.toLowerCase()))
        //    this.setState({item:fdata})
        // }

     getPreviousPrice=(a)=>{
      let price =0;
      if(document.getElementById(a.cSymbol) != null){
         price = document.getElementById(a.cSymbol).innerHTML;
      }
      if(a.last < price){
        this.colour = "red"
      }else {
        this.colour = "green"
      }      
     }

    render(){
        const {item = [], timestamp=[],filterFiat} = this.state
        return(
          <li id="otc" className="tab-pane active">
            <div id="collapseOne" className="collapse in" aria-labelledby="headingOne" data-parent="#accordionExample">
              <div className="searchSecHolder">      			
                <div className="searcHolder">
                  <input type="text" placeholder="Search" 
                  id = "search"
                  />
                  <i className="fa fa-search" aria-hidden="true" />
                </div>

                <div className="selectHolder" style={{textAlign:"center"}}>
                 <div>
                <select className="fiat-selector" 
                onChange={this.handleChange} 
                name="currencyTypes" 
                value={this.state.currencyTypes}>
                  <option value={"ANY"}>ANY</option>
                  <option value={"USDT"}>USDT</option>
                  <option value={"BTC"}>BTC</option>
                  <option value={"TUSD"}>TUSD</option>
                  <option value={"INR"}>INR</option>
                  <option value={"ACT"}>ACT</option>
                  <option value={"ETH"}>ETH</option>
                </select>
                  </div>
           
                </div>
              </div>
              <div id="content-1" className="pmd-scrollbar mCustomScrollbar">      		
                <table width="100%" border={0} id="tradingList">
                 <tbody>
                  {timestamp.length && timestamp.map((x,i)=>{
                    if(filterFiat === "ANY" || filterFiat === x.fSymbol){
                      return(
                      <tr key={i} className={x.fSymbol}>
                      <td><i className="fa fa-star"/></td>
                      <td><img src={`https://zecoex.com/images/icons/${x.cSymbol}.png`} alt="coin symbol" className="iconswidth"/></td>
                      <td><a className="coin-type"  href={`${window.location.origin}/v3/users/react/${x.cSymbol}/${x.fSymbol}`} onChange={this.getPreviousPrice(x)}>
                      {x.cSymbol}</a></td>
                      <td><span style={{color:this.colour}}>{x.fSymbol==="TUSD" || x.fSymbol==="USDT" ? x.last.toFixed(4) : x.fSymbol==="INR" ? x.last.toFixed(2) : x.last.toFixed(8)}</span><span style={{color:"#ffff"}}> {x.fSymbol}</span></td>
                      <td id={x.cSymbol} style={{display:"none"}}>{x.last}</td>
                    </tr> 
                      )
                    }
                  }
                    )}
                  </tbody>
                  </table>
              </div>
            </div>
          </li>	
        )
    }
}