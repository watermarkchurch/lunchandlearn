import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as $ from 'jquery'

import { fibonacci } from './fibonacci'
import { ResultList } from './ResultList'


$('#spinner').hide();

updateResults([])

$('#fibonacciin input').on('change', function(evt) {
  $('#spinner').show();
  updateResults([])

  fibonacci($(this).val() as number)
    .then((results) => {
      $('#spinner').hide();

      updateResults(results)
    })
})


function updateResults(list: number[]) {
  ReactDOM.render<ResultList>(
    <ResultList list={list}/>,
    document.getElementById('fibonacciout')
  )
}