const round = (number) => Math.round(number * 100) / 100;

const MonitorReducerEnhancer =
  (createStore) => (reducer, preloadedState, enhancer) => {
    const monitoredReducer = (state, action) => {
      const start = performance.now();
      const newState = reducer(state, action);
      const end = performance.now();
      const diff = round(end - start);
      console.log("reducer process time:", diff);

      return newState;
    };

    // const preloadedState = () => {
    //   const initialState = localStorage.getItem("auth");
    //   try {
    //     if (initialState === null) {
    //       return undefined;
    //     } else {
    //       setTimeout(() => {
    //         console.log("stored data after reload", initialState);
    //       }, 2000);
    //       return initialState;
    //     }
    //   } catch (error) {
    //     console.warn(error);
    //   }
    // };

    return createStore(monitoredReducer, preloadedState, enhancer);
  };

export default MonitorReducerEnhancer;
