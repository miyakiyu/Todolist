<script setup>
import { ref } from 'vue';
//DEFINED
//bind the input newTodo
const newTodo = ref(''); 
//array of todos
const todos = ref([]);
let id = 0;

//FUNCTIONS
//addTodo function
const addTodo = () =>{
  if(newTodo.value.trim() !== ''){
    todos.value.push({ id: id++, text: newTodo.value});
    newTodo.value = '';
  }
};
//removeTodo function
const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo);
};


</script>

<template>
  <div class="container">
    <h1>Todolist</h1>
      <div>
        <input v-model = "newTodo" placeholder="Add new Todo"/>
        <button v-on:click="addTodo">Add</button>
      </div>

    <!--todo-list-->
    <ul>
      <li v-for = "todo in todos" :key = "index">
        {{ todo.text }}
        <button v-on:click="removeTodo(todo)">X</button>
      </li>
    </ul>

  </div>
</template>
