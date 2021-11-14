import './generateField';
import './index.css';
import * as Model from './model/index';
import * as View from './view/index';
import * as Controller from './controller/index';

let cont = new Controller.Controller(View, Model);

cont.processMove();
