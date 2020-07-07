import React, { Component } from 'react';
import NavigationBar from '../NavigationBar/NavigationBar';
import { connect } from 'react-redux';
import ShoppingCartActions from '../../store/actions/ShoppingCartActions';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ReactImageMagnify from 'react-image-magnify';

import './ProductPage.css';

const shopAlert = withReactContent(Swal);

const SelectSize = () => (
  <div className="alert alert-dark" role="alert">
    Escolha um tamanho
  </div>
);

class ProductPage extends Component {
  constructor(props) {
    super(props);

    let _currentProduct = {};
    if (this.props.location.query) {
      _currentProduct = this.props.location.query.product;
      localStorage.productSelected = JSON.stringify(_currentProduct);
    } else {
      _currentProduct = JSON.parse(localStorage.productSelected);
    }

    this.state = {
      product: _currentProduct,
      qtySelected: 1,
      sizeSelected: null,
      redirect: false,
    };
  }

  _changeQtySelected(newQtdy) {
    this.setState({
      qtySelected: newQtdy.target.value,
    });
  }

  _changeSizeSelected(newSizeSelected) {
    this.setState({
      sizeSelected: newSizeSelected,
    });
  }

  _addItemToShoppingCart() {
    let itemToBeadded = {
      product: this.state.product,
      quantity: this.state.qtySelected,
      product_size: this.state.sizeSelected,
    };
    if (this.state.sizeSelected != null) {
      this.props.dispatch(
        ShoppingCartActions.addItemToShoppingCart(itemToBeadded)
      );

      shopAlert
        .fire({
          title: itemToBeadded.product.name,
          text: 'Adicionado com sucesso ao carrinho!',
          type: 'success',
          showCancelButton: true,
          confirmButtonColor: 'rgb(251, 101, 85)',
          cancelButtonColor: '#000000',
          confirmButtonText: 'Ir ao carrinho',
          cancelButtonText: 'Continuar comprando',
        })
        .then(result => {
          result.value
            ? (window.location.href = '/carrinho')
            : (window.location.href = '/');
        });
    }
  }

  render() {
    return (
      <>
        <NavigationBar />,
        <div className="container">
          <div className="card">
            <div className="row">
              <aside className="col-sm-5 border-right">
                <article className="gallery-wrap">
                  <div className="img-big-wrap">
                    <div>
                      <ReactImageMagnify
                        {...{
                          smallImage: {
                            alt: this.state.product.name,
                            isFluidWidth: true,
                            src: this.state.product.image,
                          },
                          largeImage: {
                            src: this.state.product.image,
                            width: 1200,
                            height: 1800,
                          },
                          enlargedImagePosition: 'over',
                          isHintEnabled: true,
                          hintTextMouse: 'Passe o mouse para ampliar',
                        }}
                      />
                    </div>
                  </div>
                </article>
              </aside>
              <aside className="col-sm-7">
                <article className="card-body p-5">
                  <h3 className="title mb-3">{this.state.product.name}</h3>

                  <p className="price-detail-wrap">
                    <span className="price h3 text-warning">
                      <span className="num">
                        {this.state.product.actual_price}
                      </span>
                    </span>
                    <span>
                      {this.state.product.actual_price <
                      this.state.product.regular_price
                        ? ` was ${this.state.product.regular_price} `
                        : ''}
                    </span>
                  </p>

                  <dl className="param param-feature">
                    <dt>Cor</dt>
                    <dd>{this.state.product.color}</dd>
                  </dl>

                  <div className="row">
                    <div className="col-sm-5">
                      <dl className="param param-inline">
                        <dt>Quantidade: </dt>
                        <dd>
                          <select
                            onChange={e => this._changeQtySelected(e)}
                            className="form-control form-control-sm"
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                          </select>
                        </dd>
                        {this.state.sizeSelected === null ? <SelectSize /> : ''}
                      </dl>
                    </div>

                    <div className="col-sm-7">
                      <dl className="param param-inline">
                        <dt>Tamanhos: </dt>
                        <dd>
                          {this.state.product.sizes
                            .filter(size => size.available)
                            .map((size, i) => {
                              return (
                                <label
                                  key={i}
                                  className="form-check form-check-inline"
                                >
                                  <input
                                    onClick={() => this._changeSizeSelected(i)}
                                    className="form-check-input"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id="inlineRadio2"
                                    value="option2"
                                  />
                                  <span className="form-check-label">
                                    {size.size}
                                  </span>
                                </label>
                              );
                            })}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <button
                    disabled={this.state.sizeSelected === null}
                    onClick={() => this._addItemToShoppingCart()}
                    className="btn btn-outline-primary"
                  >
                    Adicionar ao Carrinho
                  </button>
                </article>
              </aside>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default connect(store => ({ shoppingCartItens: store }))(ProductPage);
