/*
 * @Author: junjie.lean
 * @Date: 2021-06-28 12:07:38
 * @Last Modified by: junjie.lean
 * @Last Modified time: 2021-11-15 15:16:01
 */

/**
 * @description  一个定时器实现,利用setTimeout来模拟setInterval,并且增加补时机制,使定时器相对能较准确的执行.
 */


interface timerFN {
  (): void;
}

interface timerInfo {
  status: boolean; //定时器是否启用
  timerFlag: string; //定时器唯一标识
  timerNumber: number; //定时器返回值
  expectInterval: number; //期望的执行时间间隔
  description: string; //定时器自主描述
  count: number; //执行轮次
  startTime: number; //开始执行时间
  endTime: number | null; //结束执行时间
  lastInterval: number | null; //上一次执行的时间间隔
  lastExecuteTime: number | null; //上一次执行的时间
}

let globalTimer: Array<timerInfo> = [];

window.timer = globalTimer;

export function createTimer(
  fn: timerFN,
  time: number = 1000,
  description: string = ''
): string {
  // TODO:
  // 使用uuid来代替随机数,保证标识唯一性
  // Math.round(Math.random() * 1e20).toString(16) ===> uuid
  let timerFlag: string = Math.round(Math.random() * 1e20).toString(16);
  let timerInitialFlag = null;
  let timerNumber = null;

  const _fn = (timerInitialFlag = null) => {
    // fn();

    // 清除机制:
    // 清除 pastTime( x minutes) 之前失效的定时器,维护 globalTimer 数组大小.
    // const pastMinutes: number = 1 / 6;
    // //`仅保留正在执行的定时器,或者 ${ pastMinutes } 分钟前已经关闭的定时器`,
    // globalTimer = globalTimer.filter((item) => {
    //   return (
    //     item.status === true ||
    //     (item.status === false &&
    //       Date.now() - item.endTime < pastMinutes * 60 * 1000)
    //   );
    // });

    const timerIndex = globalTimer.findIndex(
      (item) => item.timerFlag === timerInitialFlag
    );

    if (timerIndex < 0) {
      //新创建的定时器,则加入缓存
      const startTime: number = Date.now();
      fn();

      timerNumber = window.setTimeout(() => {
        _fn(timerFlag);
      }, time);

      globalTimer.push({
        status: true,
        timerFlag,
        timerNumber,
        description,
        count: 1,
        startTime,
        endTime: null,
        lastInterval: null,
        expectInterval: time,
        lastExecuteTime: startTime,
      });
    } else {
      //当前定时器是否需要继续
      const currentTimerIsNeedContinue: boolean =
        globalTimer[timerIndex].status === true;

      //如果不是新创建的,则每轮执行前先判断是否需要注销该定时器
      if (!currentTimerIsNeedContinue) {
        //取消定时器
        window.clearTimeout(globalTimer[timerIndex].timerNumber);
      } else {
        //不取消定时器,继续执行
        const lastExecuteTime: number = Date.now();
        fn();
        const currentTimer: timerInfo = globalTimer[timerIndex];
        const { expectInterval, count, startTime } = currentTimer;
        const nextCount = count + 1;

        // 补时机制:
        // 根据 当前轮次 * 当前间隔, 也就是期望的下一次执行时间 - 当前时间
        // 计算出下一次执行的时间, 弥补积累计时误差.

        const offsetTime: number =
          Date.now() - (startTime + nextCount * expectInterval);
        const lastInterval: number = expectInterval - offsetTime;
        window.setTimeout(
          () => {
            _fn(timerFlag);
          },
          lastInterval < 0 ? 0 : lastInterval
        );

        globalTimer[timerIndex] = {
          ...currentTimer,
          count: nextCount,
          lastExecuteTime,
          lastInterval,
        };
      }
    }
  };
  //初始化调用,后续调用均在定时器内实现.
  _fn(timerInitialFlag);
  return timerFlag;
}

export function cancelTimer(timerFlag: string): void {
  let timerIndex = globalTimer.findIndex(
    (item) => item.timerFlag === timerFlag
  );

  if (timerIndex > -1) {
    globalTimer[timerIndex].status = false;
    globalTimer[timerIndex].endTime = Date.now();
  } else {
    console.log('清除定时器异常,需要清除的定时器不在全局定时器列表里!');
    console.log('全局定时器:', globalTimer);
    console.log('需要清除的定时器ID:', timerFlag);
    // throw new Error('参数异常,未能找到需要清除的定时器!');
  }
}
