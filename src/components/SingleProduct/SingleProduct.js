import { PureComponent } from "react";
import parse from 'html-react-parser';
import { connect } from "react-redux";
import {addToCart} from '../../redux/Shopping/actions';
import { Scrollbars } from 'react-custom-scrollbars';
import prev from '../../resources/prev.svg';
import next from '../../resources/next.svg';
import './SingleProduct.scss'

class SingleProduct extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            clicked: props.current.gallery[0],
            currentIndex: null,
            attributeSelected: null
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
    onSelectedAttr = (attr) => {
        this.setState({
            attributeSelected: attr
        })
        
    }
    render(){
        const {id,name,brand,inStock,description, gallery, prices, attributes} = this.props.current;
        const attr = attributes[0];
        const {attributeSelected} = this.state;
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
                            {this.props.current.gallery.length > 1 && (<><div className="click" onClick={this.handelRotationLeft}><img className="arrow-prev" src={prev} alt="" /></div>
                            <div onClick={this.handelRotationRight}><img className="arrow-next" src={next} alt="" /></div></> ) }        
                        </div>    
                    )}
                    </div>
                </div>
                <div className="single-product__info">
                    <h1 >{brand}{' '}{name}</h1>
                    {attr ? 
                    <div><h2>{attr.name}</h2> 
                    <div className="single-product__info_attr">     
                        {attr.name === 'Size' && attr.items.map((item, i) => {
                            const active = attributeSelected === item.value;
                            const clazz = active ? 'attr-active' : 'attr-non';
                            return(
                                <div
                                    onClick={() => this.onSelectedAttr(item.value)} 
                                    className={`btn-cart ${clazz}`} key={i} 
                                >
                                    {item.value}
                                </div>
                            )
                         })}
                        {attr.name === 'Color' && attr.items.map((item, i)=> (
                            <div 
                                onClick={() => this.props.selectAttr(item.value)}
                                className="btn-cart" key={i} style={{backgroundColor: `${item.displayValue}`, border:"none"}}></div>
                        ))}
                        {attr.name === 'Capacity' && attr.items.map((item, i) => {
                            const active = attributeSelected === item.value;
                            const clazz = active ? 'attr-active' : 'attr-non';
                            return(
                                <div 
                                onClick={() => this.onSelectedAttr(item.value)}
                                className={`btn-cart ${clazz}`} key={i} style={{width: "50px"}}>{item.value}</div>
                            )
                            
                        })}
                    </div> </div> : <></>
                    
                        }
                        
                    
                    <h2>Price</h2>
                    <div className="single-product__info_price">
                        {this.props.selectedCurr}
                        {prices.filter(item => item.currency.symbol === this.props.selectedCurr).map(filtered => (filtered.amount))}
                    </div>
                        
                    {((inStock && attributeSelected !== null) || (inStock && attributes.length === 0) ) ?<button 
                    onClick={() => this.props.addToCart(id,attributeSelected)}
                    className="single-product__info_add">ADD TO CART</button> : <button 
                    disabled
                    className="single-product__info_add">ADD TO CART</button>}
                    <div className="single-product__info_descr">{parse(description)}</div>
                    {/* <div className="single-product__info_descr" dangerouslySetInnerHTML={{__html: description}}>
                        {description.replace(/<\/?[a-z][a-z0-9]*>/gi, '')}
                    </div> */}
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
      addToCart: (id,attr) => dispatch(addToCart(id,attr)),
    };
  };

export default connect(mapStateToProps,mapDispatchToProps)(SingleProduct);