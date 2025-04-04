import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import todo from '@/App.vue'  

describe('App.vue', () => {
  let wrapper;

  beforeEach(()=>{
    wrapper = mount(todo);
    wrapper.vm.todos = [];
    localStorage.clear();
  });

  it("Add todo", async()=>{
    const input = wrapper.find('input');
    await input.setValue('Learing Vue.js');
    await wrapper.find('button').trigger('click');

    expect(wrapper.find('ul').text()).contains('Learing Vue.js');
  })

  it ("Romove todo", async()=>{
    wrapper.vm.todos.push({id: 1, text: 'Test case', isEdit: false});
    await wrapper.vm.$nextTick();

    await wrapper.find('button:nth-of-type(2)').trigger('click');
    await wrapper.vm.$nextTick();
    
    expect(wrapper.find('ul').text()).not.contains('Test case');
  })

  it ("Edit todo", async()=>{
    wrapper.vm.todos.push({id: 1, text: 'Test', isEdit: false});
    await wrapper.vm.$nextTick();

    const editButton = wrapper.find('button:nth-of-type(1)');
    await editButton.trigger('click');
    const input = wrapper.find('input');
    await input.setValue('Test case');

    expect(wrapper.find('input').element.value).toBe('Test case');
  })

  it("localStorage", async()=>{
    wrapper.vm.todos.push({id: 1, text: 'Test1', isEdit: false});
    await wrapper.vm.$nextTick();

    wrapper.unmount(); 
    wrapper = mount(todo); 

    expect(localStorage.getItem('todos')).toBe(JSON.stringify(wrapper.vm.todos));
  })
});
