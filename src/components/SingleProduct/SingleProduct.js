import { PureComponent } from "react";
import parse from 'html-react-parser';
import { connect } from "react-redux";
import {addToCart} from '../../redux/Shopping/actions';
import prev from '../../resources/prev.svg';
import next from '../../resources/next.svg';
import './SingleProduct.scss'
import {fetchCurrentProduct} from '../../redux/Shopping/actions';
import Spinner from "../../resources/spinner/spinner";

class SingleProduct extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            clicked: this.props.current.gallery[0],
            currentIndex: null,
            attributeSelected: null
        }
    }
    // componentDidMount(){
    //     this.setState({
    //             clicked: this.props.current.gallery[0]
    //         })
        
    // }
    componentDidUpdate(prevProps){
        if(prevProps.current.id !== this.props.current.id){
            this.setState({
                clicked: this.props.current.gallery[0]
            })
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
    getCartButtonClass(attribute, selectedAttribute){
        if(selectedAttribute === null){
            return 
        }
        return selectedAttribute === attribute.value ? 'attr-active' : 'attr-non';
    }

    render(){
        const {current,loading} = this.props;
        const {id,name,brand,inStock,description, gallery, prices, attributes} = current ;
        // const attr = attributes[0];
        const {attributeSelected} = this.state;
        if(!current || loading){
            return <Spinner/>
        }
        return(
            <div className="single-product">
                <div className="single-product__image">
                <div className="img-list">
                    {gallery.map((item, index) => (
                        <div key={index} className="wrapper-images">
                            <img
                                src={item}
                                alt={item}
                                onClick={() => this.handleClick(item, index)}
                            />
                        </div>
                    ))}
                </div>
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
                    <div className="single-product__info_attr">
                        {attributes.map(attrExist => {
                             return (
                                <>
                                {attrExist.name}
                                <div className="flex-attr">
                                    {attrExist.items.map((item, i) => {
                                        const activeColor = attributeSelected === item.displayValue;
                                        const colorSelected = activeColor ? '2px solid #5ECE7B': '2px solid transparent';
        
                                        console.log(i[item])
                                        if(attrExist.type === 'text'){
                                            return( <div
                                                onClick={() => this.onSelectedAttr(item.value)} 
                                                className={`btn-cart ${this.getCartButtonClass(item,attributeSelected)}`} key={item.value} 
                                            >
                                                {item.value}
                                            </div>)
                                        }
                                        else if(attrExist.name === "With USB 3 ports"){
                                            return( <div
                                                onClick={() => this.onSelectedAttr(item.displayValue)} 
                                                className={`btn-cart ${this.getCartButtonClass(item,attributeSelected)}`} key={item.value} 
                                            >
                                                {item.value}
                                            </div>)
                                        }
                                        else if(attrExist.type === 'swatch'){
                                            return (<div 
                                                onClick={() => this.onSelectedAttr(item.displayValue)}
                                                className="btn-cart color" key={i} style={{backgroundColor: `${item.value}`, outline:`${colorSelected}`, border:'none'}}></div>)
                                        }
                                    })}
                                </div>
                                </>
                                )
                        })}
                        </div>
                        
                    
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
      loading: state.shop.loading,
      selectedCurr: state.shop.selectedCurr
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      addToCart: (id,attr) => dispatch(addToCart(id,attr)),
      fetchCurrentProduct: (id) => dispatch(fetchCurrentProduct(id))
    };
  };

export default connect(mapStateToProps,mapDispatchToProps)(SingleProduct);