<template>
    <div>
        <app-record mode="add" weight="" notes="" />
    </div>
</template>
<script>

import Record from "../components/Record/Record"
export default {
   components: {
       "app-record": Record
   }
}
</script>