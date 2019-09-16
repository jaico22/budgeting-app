import React from 'react';
import './App.css';
import BudgetOverview from './Components/BudgetOverview/BudgetOverview';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/:budgetId?" render={(props) => <BudgetOverview {...props} />} />
      </Router>
    </div>
  );
}

export default App;
