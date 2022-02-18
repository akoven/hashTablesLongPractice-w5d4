class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.capacity = numBuckets
    this.count = 0
    this.data = new Array(numBuckets).fill(null)
    //if .fill(null) is not used:
      //this.data = [] or this.data = new Array(numBuckets)
      //for(let i = 0; i < this.capacity; i++){
        //this.data[i] = null
      //}
    this.length = this.capacity
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    const index = this.hashMod(key)
    // const newPair = new KeyValuePair(key,value)
    let currRef = this.data[index]
    while(currRef && currRef.key !== key){//if currReff is not null and the key at currReff is not equal to the incoming key, we move on to the next element in this.data
        currRef = currRef.next
    }
    if(currRef){//otherwise, if currReff exists
      currRef.value = value
    }else{//if currReff exists, but the current key and incoming key are both the same:
      const newPair = new KeyValuePair(key, value)//create a new instance of KeyValuePair class to hold the value of the incoming key/value pair

      if(this.data[index] === null){//if there isn't a node at the specified index
        this.data[index] = newPair//assign the new key/value pair to this.data at the specified index
      }else{//otherwise:
        newPair.next = this.data[index] //adjust the pointer for the new head (newPair)
        this.data[index] = newPair//and reassign the entry of this.data at the specified index
      }
      this.count++//increment count because the newPair was added to the array via a linked list implementation
    }

  }


  read(key) {
    let index = this.hashMod(key)
    let currRef = this.data[index]
    while(currRef){
      if(currRef.key === key){
        return currRef.value

      }
      currRef = currRef.next
    }
    return undefined
  }


  resize() {
    this.capacity *= 2
    let currData = this.data
    this.data = new Array(this.capacity).fill(null)
    this.count = 0
    let newPair = null;

    for(let i = 0; i < currData.length; i++){
      newPair = currData[i]

      while(newPair){
        this.insert(newPair.key, newPair.value)
        newPair = newPair.next;
      }
    }
  }


  delete(key) {
    let index = this.hashMod(key);
    let currPair = this.data[index]
    let lastPair = null;

    while(currPair && currPair.key !== key){
      lastPair = currPair
      currPair = lastPair.next
    }

    if(!currPair) return 'Key not found'
    if(!lastPair){//if the lastPair is part of a linked list
      this.data[index] = currPair.next//removing first element in linked list
    }else{
      lastPair.next = currPair.next;
    }
    this.count--;

  }
}

let key = this.key
let value = this.value
hashTable = new HashTable(key,value)
hashTable.insert('key1','value1')
hashTable.insert('key2','value2')
hashTable.insert('key3','value3')
// // console.log(hashTable.hashMod('key1'))
// // console.log(hashTable.hashMod('key2'))
// // console.log(hashTable.hashMod('key3'))
// // console.log(hashTable.hashMod('key5'))
// console.log(hashTable.read('key1'))
// console.log(hashTable.read('key2'))
// console.log(hashTable.read('key3'))
// console.log(hashTable.read('key5'))
hashTable.resize()
console.log(hashTable.read('key1'))
console.log(hashTable.read('key2'))
console.log(hashTable.read('key3'))

module.exports = HashTable;
