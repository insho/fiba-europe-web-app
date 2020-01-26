import chroma from 'chroma-js';
export const selectStylesBanner = {
    // backgroundColor: "#da3737"
    // option: (provided, state) => ({
    //   ...provided,
    //   borderBottom: "1px dotted pink",
    //   // color: state.isSelected ? "#2fb1eb" : "white",
    //   fontSize: 14,
    //   boxShadow: "none",
    //   // backgroundColor: "#da3737",
    //   backgroundColor: state.isSelected ? "#da3737" : "",
    //   textAlign: "left",
    //   cursor: "pointer",
    //   opacity: 1
      
    // }),
    container:  base => ({
      ...base,
      width: "100%"
 
      // borderRadius: 10
      

      // backgroundColor: ""
    //  opacity: 0,
    //  zIndex: 0
    }),
    control: base => ({
      ...base,
      // height: 32,
      // minHeight: 34,
      '&:hover': { backgroundColor: 'rgb(255, 255, 255, .1)',borderColor:  'rgb(255, 255, 255, 0}' }, // border style on hover
      fontSize: 14,
      borderRadius: 2,
      width: "100%",
      // height: "90%",
      textAlign: "left",
      cursor: "pointer",
      // backgroundColor: 'rgb(255, 255, 255, 0)',
      // boxShadow: state.isFocused ? 0 : 1,
      // borderColor: state.isFocused ? 'rgb(255, 255, 255, 0)' : 'rgb(255, 255, 255, 0)',
      backgroundColor: 'rgb(255, 255, 255, 0)',
      borderColor: 'rgb(255, 255, 255, 0)',
      boxShadow:  '-.2px .7px .15px .9px rgba(0,0,0,0.25)'
      // borderBottom: 1

    }),
    dropdownIndicator: base => ({
      ...base
      ,color: "white"
      // display: "none"
    }),
    indicatorSeparator: base => ({
      ...base,
      display: "none"
    }),
    valueContainer: base => ({
      ...base,
      padding: 0,
      paddingLeft: 2
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      // padding: 0
    }),
    input: base => ({
      ...base,
      color: "white"
      // kill the white space on first and last option
      // padding: 0
    }),
    placeholder: base => ({
      ...base,
      color: "white"
      
      // kill the white space on first and last option
      // padding: 0
    }),
    
    //FOR OPTIONS IN DROPDOWN
    option: base => ({
      ...base
      
      // kill the white space on first and last option
      // padding: 0
    }),
    
    //Selected Value in Box
    singleValue: base => ({
      ...base,
      color: "white"
      
      // kill the white space on first and last option
      // padding: 0
    })

    

  };
  
  export const selectStylesSecondary = {
    // backgroundColor: "#da3737"
    // option: (provided, state) => ({
    //   ...provided,
    //   borderBottom: "1px dotted pink",
    //   // color: state.isSelected ? "#2fb1eb" : "white",
    //   fontSize: 14,
    //   boxShadow: "none",
    //   // backgroundColor: "#da3737",
    //   backgroundColor: state.isSelected ? "#da3737" : "",
    //   textAlign: "left",
    //   cursor: "pointer",
    //   opacity: 1
      
    // }),
    container:  base => ({
      ...base,
      width: "100%"
 
      // borderRadius: 10
      

      // backgroundColor: ""
    //  opacity: 0,
    //  zIndex: 0
    }),
    // control: base => ({
    //   ...base,
    //   // height: 32,
    //   // minHeight: 34,
    //   '&:hover': { backgroundColor: 'rgb(255, 255, 255, .1)',borderColor:  'rgb(255, 255, 255, 0}' }, // border style on hover
    //   fontSize: 14,
    //   borderRadius: 2,
    //   width: "100%",
    //   // height: "90%",
    //   textAlign: "left",
    //   cursor: "pointer",
    //   // backgroundColor: 'rgb(255, 255, 255, 0)',
    //   // boxShadow: state.isFocused ? 0 : 1,
    //   // borderColor: state.isFocused ? 'rgb(255, 255, 255, 0)' : 'rgb(255, 255, 255, 0)',
    //   backgroundColor: 'rgb(255, 255, 255, 0)',
    //   borderColor: 'rgb(255, 255, 255, 0)',
    //   boxShadow:  '-.2px .1px .15px .9px rgba(0,0,0,0.45)'
    //   // borderBottom: 1

    // }),

    dropdownIndicator: base => ({
      ...base
      ,color: "#656565"
      // display: "none"
    }),
    indicatorSeparator: base => ({
      ...base,
      display: "none"
    }),
    valueContainer: base => ({
      ...base,
      padding: 0,
      paddingLeft: 2
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      // padding: 0
    }),
    input: base => ({
      ...base,
      color: "#000000"
      // kill the white space on first and last option
      // padding: 0
    }),
    placeholder: base => ({
      ...base,
      color: "#000000"
      
      // kill the white space on first and last option
      // padding: 0
    }),
    
    //FOR OPTIONS IN DROPDOWN
    option: base => ({
      ...base
      
      // kill the white space on first and last option
      // padding: 0
    }),
    
    //Selected Value in Box
    singleValue: base => ({
      ...base,
      color: "#000000"
      
      // kill the white space on first and last option
      // padding: 0
    })
    ,
    control: styles => ({ ...styles, backgroundColor: "white" }),
    multiValue: (styles, { data }) => {
      // console.log("sUPER: " + JSON.stringify(data))
      const color = chroma("black" );
      return {
        ...styles,
        backgroundColor: color.alpha(0.8).css()
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      // backgroundColor: "black",
      color: "black"
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      }
    })
    

  };