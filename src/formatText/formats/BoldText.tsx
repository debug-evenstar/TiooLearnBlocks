
export const BoldText = (data:string): React.ReactNode => {
    const pattern = /<\*\*(.*?)\*\*>/g;
    const stringRows = data.split(pattern);
    const matches = data.match(pattern) || [];
    const stringsWithoutTags: any[] = [];
    matches.forEach((str) => {
        const stringWithoutTags = str.replace(pattern, (match, p1) => p1);
        stringsWithoutTags.push(stringWithoutTags);
      });
      const searchWords = stringsWithoutTags; 

      // Filter the array based on the search words
      const filteredArray = stringRows.filter(item =>
        searchWords.some(word =>
          item.toLowerCase().includes(word.toLowerCase())
        )
      );
    //   const filteredArray = stringRows.map(item =>
    //     searchWords.includes(item) ? <strong>{item}</strong> : item
    //   );
    const joined = filteredArray.join('')
    
    return (
        <>
        {stringRows.map((item, index) => (
          <span key={index}>
            {filteredArray.includes(item) ? <strong>{item}</strong> : item}
          </span>
        ))}
        {/* <span dangerouslySetInnerHTML={{ __html: joined }} /> */}
      </>
    )
}
