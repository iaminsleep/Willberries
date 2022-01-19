import React, {Component} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/header.js';
import Footer from './components/footer.js';
import CartModal from './components/cartModal.js';

import Home from './pages/home.js';
import Goods from './pages/goods.js';

const API = "http://api.willberries/goods";
const HOST = "http://localhost:3000/Willberries/";
const temporaryThing = '/Willberries';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goods: [],
      value: '',
      category: '',
      itemName: '',
    }
  }

  componentDidMount() {
    this.init();
    this.initCategoryFilters();
    this.initSearchHandler();
    this.initEventListeners();
  }

  getData(value, category) {
    fetch(API).then((res) => res.json()).then((data) => {
      const categoryGoods = category ? data.filter((item) => item[category] === value) : data;
      this.setState({goods: categoryGoods});
    });
  }

  searchData(itemName = '') {
    fetch(API).then((res) => res.json()).then((data) => {
        const searchedGoods = itemName !== '' ? data.filter(good => good.name.toLowerCase().includes(itemName.toLowerCase())) : data;
        this.setState({goods: searchedGoods});
      }
    );
  }

  getDataByLabel(label = "") {
    fetch(API).then((res) => res.json()).then((data) => {
        const labeledGoods = label !== '' ? data.filter((good) => good.label === label) : data;
        this.setState({goods: labeledGoods});
      }
    );
  }

  initCategoryFilters() {
    const links = document.querySelectorAll('.navigation-link');

    links.forEach(link => {
      link.onclick = () => {
        const linkValue = link.textContent;
        const category = link.dataset.field;
        this.setState({
          value: linkValue,
          category: category,
        }, () => this.getData(this.state.value, this.state.category));
      }
    });
  }

  initSearchHandler() {
    const input = document.querySelector('.search-block > input');
    const searchBtn = document.querySelector('.search-block > button');

    searchBtn.addEventListener('click', () => {
      this.setState({
        itemName: input.value,
      }, () => this.searchData(input.value))
    });
  }

  initEventListeners() {
    const link = document.querySelector('.scroll-link');
    link.addEventListener('click', (e) => {
      e.preventDefault();

      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
    })
  }

  init() {
    console.log(window.location.href);
    if(window.location.href === HOST) {
      console.log('Home');
      this.getDataByLabel("New");
    }
    if(window.location.href === `${HOST}/goods`) {
      console.log('Goods');
      this.getData(this.state.value, this.state.category, this.state.itemName);
    }
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Header HOST={HOST}/>
            <Routes>
              <Route exact path={`${temporaryThing}`} exact element={<Home category = {this.state.category} goods={this.state.goods} />}/>
              <Route path={`${temporaryThing}/goods`} element={<Goods category = {this.state.value} goods={this.state.goods}/>}/>
            </Routes>
          <Footer/>
          <CartModal/>
        </Router>
      </React.Fragment>
    );
  } 
}

export default App;
