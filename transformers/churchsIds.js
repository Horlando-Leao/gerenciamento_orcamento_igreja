class ChurchIdTranformer {
    
    /**
     * 
     * @param {Array} ids
     */
    static toDatabase(ids) {
        if (ids === undefined){
            return ""
        }

        if(ids.length === 0){
            return "";
        }
        
        return ids.map(id => id.trim()).join(",");
    }
}

module.exports = { ChurchIdTranformer }