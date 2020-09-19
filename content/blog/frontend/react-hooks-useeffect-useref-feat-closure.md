---
title: React Hooks useEffect를 쓸 때, useState vs useRef (feat.closure)
date: 2019-11-01 16:09:87
category: frontend
thumbnail: { thumbnailSrc }
draft: false
description: useEffect에서 dependency에 단순히 []를 넘겨서 componentDidMount, componentWillUnmount 역할을 수행하게 했던 정도의 이해도로 해결하기 힘든 문제상황이 발생했습니다. useRef hooks로 문제를 해결해본 경험을 공유합니다.
---


React native로 앱을 만들던 중, 다음과 같은 로직을 구현해야만 하는 일이 생겼습니다.

> 한 component에서 setInterval로 시간을 재다가 unmount되면 alert을 띄운다.

룰루랄라 다음처럼 코드를 바로 짰습니다. (제가 겪은 상황은 react native였지만 편의상 react 버전으로 코드를 기재했습니다. 값을 rendering하는 부분도 실제 코드에서는 비워져있지만 비교를 위해서 추가했습니다.)

```javascript
function Counter() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(counter => counter + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
      alert(counter);
    };
  }, []);
  return (
    <div>
      <p>{counter}</p>
    </div>
  );
}
```

```componentDidMount```에서 setInterval을 설정하고, ```componentWillUnmount```에서 setInterval을 cleanup하고, alert를 띄워주는 코드를 Hooks 버전으로 만든 것이죠. class component였으면 counter를 this.state에 넣었을테니, useState를 만들어서 count를 해주구요.

저 코드를 실행하게되면, (실행 결과를 비교해볼 수 있는 codesandbox를 밑에 첨부했습니다.) counter가 1초마다 증가하는 rendering은 정상적으로 나타나지만, alert은 항상 0으로 나옵니다. 

아 맞다! useEffect는 두 번째 인자로 dependencies를 받지! 라고 생각했지만...

```javascript
useEffect(() => {
  const timer = setInterval(() => {
    setCounter(counter => counter + 1);
  }, 1000);
  return () => {
    clearInterval(timer);
    alert(counter);
  };
}, [counter]);
```

이렇게 만들어버리면 counter가 변할 때마다 useEffect가 trigger되니까 원래 로직이랑 달라지게 되네요.

흠... 그래서 열심히 SO를 검색해봤고 이유를 찾았습니다.
(https://stackoverflow.com/questions/53633698/referencing-outdated-state-in-react-useeffect-hook)

> The reason for this is due to closures. A closure is a function's reference to the variables in its scope. Your useEffect callback is only ran once when the component mounts and hence the return callback is referencing the initial count value of 0. 

useState가 closure 안의 값까지 업데이트해줄 수는 없는것이죠... 그래서 useEffect의 callback을 다시 호출해주기 위한 것이 useEffect의 dependency인 것이구요.

```javascript
const value = useRef(0);
const [count, setCount] = useState(value.current);
```
위 SO 링크의 답변자분은 위와 같은 *ugly hack*을 제시했는데요, 제 상황에서는 굳이 DOM이 업데이트될 필요가 없으니 그냥 useRef만 썼습니다.

```javascript
function CounterKai() {
  const counter = useRef(0);
  useEffect(() => {
    const timer = setInterval(() => {
      counter.current += 1;
    }, 1000);
    return () => {
      clearInterval(timer);
      alert("<CounterKai/>:", counter.current);
    };
  }, []);
  return (
    <div>
      <p>{counter.current}</p>
    </div>
  );
}
```

React Hooks를 공부할 때, useRef가 응? 그거 그냥 ref={...} 이거랑 비슷한거 아냐? 라고 생각해서 대수롭게 보지 않았는데... 공식 문서를 자세히 살펴봤습니다.

> ```
> const refContainer = useRef(initialValue);
> ```
> useRef는 .current 프로퍼티로 전달된 인자(initialValue)로 초기화된 변경 가능한 ref 객체를 반환합니다. **반환된 객체는 컴포넌트의 전 생애주기를 통해 유지될 것입니다.**

> 이 기능은 클래스에서 인스턴스 필드를 사용하는 방법과 유사한 어떤 가변값을 유지하는 데에 편리합니다.
https://ko.reactjs.org/docs/hooks-reference.html#useref

useRef는 컴포넌트의 전 생애주기를 통해 유지되는 값이라는 의미가 있었네요!

> Refs don't give you the closure issue mentioned above because refs is an object with a current field and multiple calls to useRef will return you the same object

useRef는 순수한 자바스크립트 객체를 생성시켜주고 유지시켜주기 때문에 closure 이슈가 발생하지 않습니다.



위 코드는 https://codesandbox.io/s/usestate-useref-dr7ol 이 링크에서 실행해보실 수 있습니다!