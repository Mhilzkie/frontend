import React from 'react';

export default class BaseComponent extends React.Component {
    constructor(){
        if (document.cookie.split(';')[0].split('=')[1] !== 1){
            window.location.href = '/';
        }
    }
}