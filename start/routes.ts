/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

import LiteralNamingStrategy from 'App/Models/ColumnStrategy/LiteralStrategy'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'

BaseModel.namingStrategy = new LiteralNamingStrategy();

Route.get('/', 'CategoryController.index')

Route.post('/login', 'AuthController.login')

Route.post('/register', 'AuthController.register')

Route.delete('/logout', 'AuthController.destroy')

Route.group(() => {

  Route.get('truth/:category', 'TruthOrDareController.truthQuestion')
  Route.get('dare/:category', 'TruthOrDareController.dareQuestion')

}).prefix('question')


Route.group(() => {

  Route.resource('category', 'CategoryController')
  Route.resource('question', 'QuestionController')

}).prefix('admin').middleware('auth');