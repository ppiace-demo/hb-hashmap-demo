<template>
  <div class="auth-page">
    <div class="container">
      <Navbar />
      <div class="row mt-5">
        <div class="row" style="width:100%">
          <div class="col">
            <form class="form-inline">
                <div class="form-group mb-2">
                  <label for="entryKey" class="sr-only">Key</label>
                  <input type="text" class="form-control" id="entryKey" v-model="entryKey" placeholder="Key">
                </div>
                <div class="form-group mx-sm-3 mb-2">
                  <label for="entryValue" class="sr-only">Value</label>
                  <input type="text" class="form-control" id="entryValue" v-model="entryValue" placeholder="Value">
                </div>
                <button type="button" :disabled="!buttonEnabled" class="btn btn-primary mb-2" @click="addEntry">Add</button>
            </form> 
          </div>
        </div>
        <div class="row">
          <div class="col">
            <form class="form-inline">
                <div class="form-group mb-2 mr-4">
                  <label for="entryKey" class="sr-only">Key to delete</label>
                  <input type="text" class="form-control" id="entryKeydDelete" v-model="entryKeydDelete" placeholder="Key to delete">
                </div>
                <button type="button" :disabled="!deleteButtonEnabled" class="btn btn-danger mb-2" @click="deleteEntry">Delete</button>
            </form>
          </div>
        </div>
        <div class="card" style="width:100%;">
          <div class="card-header">
            <h2> Manage Hashmap </h2>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">KEY</th>
                <th scope="col">DATA</th>
              </tr>
            </thead>            
            <tbody>
              <tr v-for="bucket in hashmapPlainList" :key="bucket.hashedKey"> 
                <th scope="row">{{ bucket.hashedKey}}</th>
                <td class="entries"> 
                  <span v-for="entry in bucket.entries" :key="entry.key"> [<b>{{entry.key}}</b>] => <i>{{entry.value}}</i></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="row mt-4" style="width:100%">
          <div class="col">
            <form class="form-inline">
                <button type="button" class="btn btn-danger mb-2" @click="clear">Clear</button>
            </form> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import HashmapService from "../services/hashmap.service";

export default {
  data() {
    return {
        hashmapDb: {},
        entryKey: '',
        entryValue : '',
        entryKeydDelete : ''
    };
  },
  computed:{
    buttonEnabled: function(){
      return true;
      return (this.entryKey.length > 0 && this.entryValue.length > 0 )
    },
    deleteButtonEnabled: function(){
      return true;
      return (this.entryKeydDelete.length > 0)
    },
    hashmapPlainList: function(){
      return this.hashmapDb?.hashmap?.data;
    }
  },
  mounted: async function () {
    this.refresh()
  },
  
  methods: {
      async refresh(){
        this.hashmapDb = await HashmapService.getMyHashmap();
      },
      async addEntry(){
          this.errors = [];
          const { entryKey, entryValue} = this;
          this.entryKey = '';
          this.entryValue = '';
          const res = await HashmapService.insert(entryKey,entryValue);          
          if(res?.success) {
              this.refresh();
          } else {
              this.errors.push(res?.message || res)
          }                        
      },
      async deleteEntry(){
          this.errors = [];
          const { entryKeydDelete} = this;
          this.entryKeydDelete = '';
          const res = await HashmapService.remove(entryKeydDelete)
          if(res?.success) {
            this.refresh();              
          } else {
              this.errors.push(res?.message || res)
          }                        
      },
      async clear(){
          const res = await HashmapService.clear()
          if(res?.success) {
            this.refresh();              
          } else {
              this.errors.push(res?.message || res)
          }                        
      }
  }
};
</script>
<style scoped>
.entries span:not(:last-child)::after {
  content: ',';
}
</style>