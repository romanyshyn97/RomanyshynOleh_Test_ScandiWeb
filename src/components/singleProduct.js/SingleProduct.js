import { PureComponent } from "react";

import { connect } from "react-redux";
import {addToCart} from '../../redux/Shopping/actions';
import { Scrollbars } from 'react-custom-scrollbars';
import prev from '../../resources/prev.svg';
import next from '../../resources/next.svg';
import './singleProduct.scss'

class SingleProduct extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            clicked: props.current.gallery[0],
            currentIndex: null
        }
        
        
    }

    
    handleClick = (item, index) => {
        this.setState({
            clicked: item,
            currentIndex: index
        })
      };
    handelRotationRight = () => {
        const data = this.props.current.gallery;
        const totalLength = data.length;
        if (this.state.currentIndex + 1 >= totalLength) {
            this.setState({
                currentIndex: 0
            })
          
          const newUrl = data[0];
          this.setState({
            clicked: newUrl
          })
          
          return;
        }
        const newIndex = this.state.currentIndex + 1;
        const newUrl = data.filter((item) => {
          return data.indexOf(item) === newIndex;
        });
        const newItem = newUrl[0];
        this.setState({
            clicked: newItem,
            currentIndex:newIndex
        })
        
        
      };
    
    handelRotationLeft = () => {
        const data = this.props.current.gallery;
        const totalLength = data.length;
        if (this.state.currentIndex === 0) {
            this.setState({
                currentIndex: 0
            })
          const newUrl = data[totalLength - 1];
          this.setState({
            clicked: newUrl
          })
          return;
        }
        const newIndex = this.state.currentIndex - 1;
        const newUrl = data.filter((item) => {
          return data.indexOf(item) === newIndex;
        });
        const newItem = newUrl[0];
        this.setState({
            clicked: newItem,
            currentIndex:newIndex
        })
      };
   

    render(){
        const {id,name, description, gallery, prices, attributes} = this.props.current;
        const {items} = attributes[0];
        const attr = attributes[0];
        return(
            
            <div className="single-product">
                <div className="single-product__image">
                <Scrollbars style={{ width: 120, height: 440 }}>
                    {gallery.map((item, index) => (
                        <div key={index} className="wrapper-images">
                            <img
                                src={item}
                                alt={item}
                                onClick={() => this.handleClick(item, index)}
                            />
                        </div>
                    ))}
                </Scrollbars>
                <div className="bigImg">
                    {this.state.clicked && (
                        <div >
                            <img src={this.state.clicked} alt="" />
                            <div className="click" onClick={this.handelRotationLeft}><img className="arrow-prev" src={prev} alt="" /></div>
                            <div onClick={this.handelRotationRight}><img className="arrow-next" src={next} alt="" /></div>
                        </div>
                        
                    )}
                    </div>
                </div>
                <div className="single-product__info">
                    <h1 style={{'fontSize': '30px', 'fontWeight':'600', 'paddingBottom': '20px'}}>{name}</h1>
                    <h2>{attr.name}</h2>
                    <div className="single-product__info_attr">
                        
                        {attr.name === 'Size' && items.map(item => (
                            <div className="btn-cart" key={item.id} >{item.value}</div>
                        ))}
                        {attr.name === 'Color' && items.map(item => (
                            <div className="btn-cart" key={item.id} style={{backgroundColor: `${item.displayValue}`, border:"none"}}></div>
                        ))}
                        {attr.name === 'Capacity' && items.map(item => (
                            <div className="btn-cart" key={item.id} style={{width: "50px"}}>{item.value}</div>
                        ))}
                    </div>
                    <h2>Price</h2>
                    <div className="single-product__info_price">
                        {this.props.selectedCurr}
                        {prices.filter(item => item.currency.symbol === this.props.selectedCurr).map(filtered => (filtered.amount))}
                    </div>
                        
                    
                    <button 
                        onClick={() => this.props.addToCart(id)}
                        className="single-product__info_add">ADD TO CART</button>
                    <div className="single-product__info_descr">
                        {description}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      current: state.shop.currentItem,
      selectedCurr: state.shop.selectedCurr
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      addToCart: (id) => dispatch(addToCart(id)),
    };
  };

export default connect(mapStateToProps,mapDispatchToProps)(SingleProduct);