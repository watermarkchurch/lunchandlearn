import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as $ from 'jquery'

import { Fibonacci } from './fibonacci'
import { ResultList } from './ResultList'


$('#spinner').hide();

updateResults([])

$('#fibonacciin input').on('change', function(evt) {
  $('#spinner').show();
  updateResults([])

  const f = new Fibonacci()

  console.log('running')
  f.run($(this).val() as number)
    .on('end', (results) => {
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