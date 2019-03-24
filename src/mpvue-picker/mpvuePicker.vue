<template>
	<view class="mpvue-picker">
		<view :class="{'pickerMask':showPicker}" @click="maskClick" catchtouchmove="true"></view>
		<view class="mpvue-picker-content " :class="{'mpvue-picker-view-show':showPicker}">
			<view class="mpvue-picker__hd" catchtouchmove="true">
				<view class="mpvue-picker__action" @click="pickerCancel">取消</view>
				<view class="mpvue-picker__action" :style="{color:themeColor}" @click="pickerConfirm">确定</view>
			</view>
			<!-- 单列 -->
			<picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChange"
			 v-if="mode==='selector' && pickerValueSingleArray.length > 0">
				<block>
					<picker-view-column>
						<view class="picker-item" v-for="(item,index) in pickerValueSingleArray" :key="index">{{item.label}}</view>
					</picker-view-column>
				</block>
			</picker-view>
			<!-- 日期选择器 -->
			<picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerDateChange"
			 v-if="mode==='dateSelector'">
				<block>
					<picker-view-column>
						<view class="picker-item" v-for="(item,index) in pickerValueYear" :key="index">{{item.label}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="picker-item" v-for="(item,index) in pickerValueMonth" :key="index">{{item.label}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="picker-item" v-for="(item,index) in pickerValueDay" :key="index">{{item.label}}</view>
					</picker-view-column>
				</block>
			</picker-view>
			<!-- 时间选择器 -->
			<picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChange"
			 v-if="mode==='timeSelector'">
				<block>
					<picker-view-column>
						<view class="picker-item" v-for="(item,index) in pickerValueHour" :key="index">{{item.label}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="picker-item" v-for="(item,index) in pickerValueMinute" :key="index">{{item.label}}</view>
					</picker-view-column>
				</block>
			</picker-view>
			<!-- 多列选择 -->
			<picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChange"
			 v-if="mode==='multiSelector'">
				<block v-for="(n,index) in pickerValueMulArray.length" :key="index">
					<picker-view-column>
						<view class="picker-item" v-for="(item,index1) in pickerValueMulArray[n]" :key="index1">{{item.label}}</view>
					</picker-view-column>
				</block>
			</picker-view>
			<!-- 二级联动 -->
			<picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChangeMul"
			 v-if="mode==='multiLinkageSelector' && deepLength===2">
				<block>
					<picker-view-column>
						<view class="picker-item" v-for="(item,index) in pickerValueMulTwoOne" :key="index">{{item.label}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="picker-item" v-for="(item,index) in pickerValueMulTwoTwo" :key="index">{{item.label}}</view>
					</picker-view-column>
				</block>
			</picker-view>
			<!-- 三级联动 -->
			<picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChangeMul"
			 v-if="mode==='multiLinkageSelector' && deepLength===3">
				<block>
					<picker-view-column>
						<view class="picker-item" v-for="(item,index) in pickerValueMulThreeOne" :key="index">{{item.label}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="picker-item" v-for="(item,index) in pickerValueMulThreeTwo" :key="index">{{item.label}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="picker-item" v-for="(item,index) in pickerValueMulThreeThree" :key="index">{{item.label}}</view>
					</picker-view-column>
				</block>
			</picker-view>
		</view>
	</view>
</template>

<script>
	/*
	 *@description 判断是否为闰年 yN 年份数字
	 * 判定公历闰年遵循的一般规律为：四年一闰，百年不闰，四百年再闰。
	 * 公历闰年的精确计算方法：（按一回归年365天5小时48分45.5秒）
	 * 普通年能被4整除而不能被100整除的为闰年。 （如2004年就是闰年，1900年不是闰年）
	 * 世纪年能被400整除而不能被3200整除的为闰年。 (如2000年是闰年，3200年不是闰年)
	 * 对于数值很大的年份能整除3200,但同时又能整除172800则又是闰年。(如172800年是闰年，86400年不是闰年）
	 * 
	 * 公元前闰年规则如下：
	 * 非整百年：年数除4余数为1是闰年，即公元前1、5、9……年；
	 * 整百年：年数除400余数为1是闰年，年数除3200余数为1，不是闰年,年数除172800余1又为闰年，即公元前401、801……年。
	 * https://www.cnblogs.com/BpLoveGcy/archive/2010/03/29/1700085.html
	 */
	function isLeap(yN) {
		if ((yN % 400 == 0 && yN % 3200 != 0) ||
			(yN % 4 == 0 && yN % 100 != 0) ||
			(yN % 3200 == 0 && yN % 172800 == 0))
			return true;
		else
			return false;
	}

	export default {
		data() {
			return {
				pickerChangeValue: [],
				pickerValue: [],
				pickerValueArrayChange: true,
				modeChange: false,
				pickerValueSingleArray: [],
				pickerValueYear: [],
				pickerValueMonth: [],
				pickerValueDay: [],
				pickerValueHour: [],
				pickerValueMinute: [],
				pickerValueMulArray: [],
				pickerValueMulTwoOne: [],
				pickerValueMulTwoTwo: [],
				pickerValueMulThreeOne: [],
				pickerValueMulThreeTwo: [],
				pickerValueMulThreeThree: [],
				/* 是否显示控件 */
				showPicker: false,
			};
		},
		props: {
			/* mode */
			mode: {
				type: String,
				default: 'selector'
			},
			/* picker 数值 */
			pickerValueArray: {
				type: Array,
				default () {
					return []
				}
			},
			/* 默认值 */
			pickerValueDefault: {
				type: [Array, Date],
				default () {
					return [];
				}
			},
			/* 几级联动 */
			deepLength: {
				type: Number,
				default: 2
			},
			/* 主题色 */
			themeColor: String
		},
		watch: {
			pickerValueArray(oldVal, newVal) {
				this.pickerValueArrayChange = true;
			},
			mode(oldVal, newVal) {
				this.modeChange = true;
			},
			pickerValueArray(val) {
				this.initPicker(val);
			}
		},
		methods: {
			initPicker(valueArray) {
				let pickerValueArray = valueArray;
				this.pickerValue = this.pickerValueDefault;
				// 初始化多级联动
				if (this.mode === 'selector') {
					this.pickerValueSingleArray = valueArray;
				} else if (this.mode === 'dateSelector') {
					//日期选择器
					this.modeChange = false;
					this.deepLength === 3;
					let yearArray = [];
					let monthArray = [];
					let dayArray = [];
					// 没有给默认值的情况
					if (
					(Object.prototype.toString.call(this.pickerValueDefault) == "[object Array]" 
					&& this.pickerValueDefault.length > 0) 
					||
					(Object.prototype.toString.call(this.pickerValueDefault) !== "[object Date]")
					) {
						throw '默认值必须是日期类型!'
					}
					else if (Object.prototype.toString.call(this.pickerValueDefault) == "[object Array]" && this.pickerValueDefault.length == 0) {
						this.pickerValue = new Date();
					}
					
					var now = new Date(this.pickerValue);
					//年份范围: 1990 ~ 当前日期 + 100年
					var lastYear = new Date().getFullYear() + 100;
					if (now.getFullYear()> lastYear || now.getFullYear() < 1900)
						throw '日期范围只能在 1990 ~ ' + lastYear + ' 之间';
					let yearIndex, monthIndex, dayIndex;
					for (let i = 1900; i <= lastYear; i++) {
						if (i == now.getFullYear()) {
							yearIndex = i - 1990;
						}
						yearArray.push({
							value: i,
							label: i
						});
					}
					for (let i = 1; i <= 12; i++) { // 月 是从 0 开始算
						if ((i - 1) == now.getMonth()) {
							monthIndex = i - 1;
						}
						monthArray.push({
							value: i,
							label: i > 9 ? `${i}` : `0${i}`
						});
					}
					for (let i = 1; i <= 31; i++) {
						if (i == now.getDate()) {
							dayIndex = i - 1;
						}
						dayArray.push({
							value: i,
							label: i > 9 ? `${i}` : `0${i}`
						});
					}
					this.pickerValueYear = yearArray;
					this.pickerValueMonth = monthArray;
					this.pickerValueDay = dayArray; 
					this.pickerValue = [yearIndex, monthIndex, dayIndex];
					//console.log(this.pickerValue)
				} else if (this.mode === 'timeSelector') {
					this.modeChange = false;
					let hourArray = [];
					let minuteArray = [];
					for (let i = 0; i < 24; i++) {
						hourArray.push({
							value: i,
							label: i > 9 ? `${i} 时` : `0${i} 时`
						});
					}
					for (let i = 0; i < 60; i++) {
						minuteArray.push({
							value: i,
							label: i > 9 ? `${i} 分` : `0${i} 分`
						});
					}
					this.pickerValueHour = hourArray;
					this.pickerValueMinute = minuteArray;
				} else if (this.mode === 'multiSelector') {
					this.pickerValueMulArray = valueArray;
				} else if (this.mode === 'multiLinkageSelector' && this.deepLength === 2) {
					// 两级联动
					let pickerValueMulTwoOne = [];
					let pickerValueMulTwoTwo = [];
					// 第一列
					for (let i = 0, length = pickerValueArray.length; i < length; i++) {
						pickerValueMulTwoOne.push(pickerValueArray[i]);
					}
					// 渲染第二列
					// 如果有设定的默认值
					if (this.pickerValueDefault.length === 2) {
						let num = this.pickerValueDefault[0];
						for (
							let i = 0, length = pickerValueArray[num].children.length; i < length; i++
						) {
							pickerValueMulTwoTwo.push(pickerValueArray[num].children[i]);
						}
					} else {
						for (
							let i = 0, length = pickerValueArray[0].children.length; i < length; i++
						) {
							pickerValueMulTwoTwo.push(pickerValueArray[0].children[i]);
						}
					}
					this.pickerValueMulTwoOne = pickerValueMulTwoOne;
					this.pickerValueMulTwoTwo = pickerValueMulTwoTwo;
				} else if (
					this.mode === 'multiLinkageSelector' &&
					this.deepLength === 3
				) {
					let pickerValueMulThreeOne = [];
					let pickerValueMulThreeTwo = [];
					let pickerValueMulThreeThree = [];
					// 第一列
					for (let i = 0, length = pickerValueArray.length; i < length; i++) {
						pickerValueMulThreeOne.push(pickerValueArray[i]);
					}
					// 渲染第二列
					this.pickerValueDefault =
						this.pickerValueDefault.length === 3 ?
						this.pickerValueDefault : [0, 0, 0];
					if (this.pickerValueDefault.length === 3) {
						let num = this.pickerValueDefault[0];
						for (
							let i = 0, length = pickerValueArray[num].children.length; i < length; i++
						) {
							pickerValueMulThreeTwo.push(pickerValueArray[num].children[i]);
						}
						// 第三列
						let numSecond = this.pickerValueDefault[1];
						for (let i = 0, length = pickerValueArray[num].children[numSecond].children.length; i < length; i++) {
							pickerValueMulThreeThree.push(
								pickerValueArray[num].children[numSecond].children[i]
							);
						}
					}
					this.pickerValueMulThreeOne = pickerValueMulThreeOne;
					this.pickerValueMulThreeTwo = pickerValueMulThreeTwo;
					this.pickerValueMulThreeThree = pickerValueMulThreeThree;
				}
			},
			show() {
				setTimeout(() => {
					if (this.pickerValueArrayChange || this.modeChange) {
						this.initPicker(this.pickerValueArray);
						this.showPicker = true;
						this.pickerValueArrayChange = false;
						this.modeChange = false;
					} else {
						this.showPicker = true;
					}
				}, 0);
			},
			maskClick() {
				this.pickerCancel();
			},
			pickerCancel() {
				this.showPicker = false;
				this._initPickerVale();
				let pickObj = {
					index: this.pickerValue,
					value: this._getPickerLabelAndValue(this.pickerValue, this.mode).value,
					label: this._getPickerLabelAndValue(this.pickerValue, this.mode).label
				};
				this.$emit('onCancel', pickObj);
			},
			pickerConfirm(e) {
				this.showPicker = false;
				this._initPickerVale();
				let pickObj = {
					index: this.pickerValue,
					value: this._getPickerLabelAndValue(this.pickerValue, this.mode).value,
					label: this._getPickerLabelAndValue(this.pickerValue, this.mode).label
				};
				this.$emit('onConfirm', pickObj);
			},
			showPickerView() {
				this.showPicker = true;
			},
			pickerChange(e) {
				this.pickerValue = e.mp.detail.value;
				let pickObj = {
					index: this.pickerValue,
					value: this._getPickerLabelAndValue(this.pickerValue, this.mode).value,
					label: this._getPickerLabelAndValue(this.pickerValue, this.mode).label
				};
				this.$emit('onChange', pickObj);
			},
			pickerDateChange(e) {
				let changeValue = e.mp.detail.value;
				const febRNDays = 29; //闰年 2月
				const febPNDays = 28; //平年 2月
				const bigMonthDays = 31; //大月
				const smallMontdhDays = 30; //小月
				const bigMonthArr = [1, 3, 5, 7, 8, 10, 12]; //大月份 
				let pickerValueDay = this.pickerValueDay;
				//是否闰年
				var isYN = isLeap(this.pickerValueYear[changeValue[0]].value);
				/* 逻辑:
				   1.如果是 年 动
				     则 月 不动
					 则 日 : 如果是闰年 且为 2月, 判断日数组的长度是否为29,否则重给数组赋值
					        如果是平年 且为 2月, 判断日数组的长度是否为28,否则重给数组赋值
					        如果当前日为最后天,且index > 数组的长度 - 1, 则index = 数组的长度 - 1;
							否则 不动
				    2.如果是 月 动
					 则 日:  如果是闰年 且为 2月, 判断日数组的长度是否为29,否则重给数组赋值
					        如果是平年 且为 2月, 判断日数组的长度是否为28,否则重给数组赋值
							判断 月 是否为 大月, 判断日数组的长度是否为31,否则重给数组赋值
							判断 月 是否为 小月, 判断日数组的长度是否为30,否则重给数组赋值
					        如果当前日为最后天,且index > 数组的长度 - 1, 则index = 数组的长度 - 1;
							否则 不动
				 */
				// 不管是 年 或 月 动都是重新渲染第三列
				//是否是2月份
				var monthVal = this.pickerValueMonth[changeValue[1]].value;
				var dayLength = this.pickerValueDay.length;
				if (monthVal == 2) {
					if (isYN && this.pickerValueDay.length != febRNDays) {
						dayLength = febRNDays;
					} else if (this.pickerValueDay.length != febPNDays) {
						dayLength = febPNDays;
					}
				} else if (bigMonthArr.indexOf(monthVal) > -1 && this.pickerValueDay.length != bigMonthDays) {
					dayLength = bigMonthDays;
				} else if (bigMonthArr.indexOf(monthVal) < 0 && this.pickerValueDay.length != smallMontdhDays) {
					dayLength = smallMontdhDays;
				}
				if (dayLength != this.pickerValueDay.length) {
					pickerValueDay = [];
					for (let i = 1; i <= dayLength; i++) { //判断当前是否是闰年 & 月份
						pickerValueDay.push({
							value: i,
							label: i > 9 ? `${i}` : `0${i}`
						});
					}
				}
				// 判断日是否是 最后一天
				if (changeValue[2] > pickerValueDay.length - 1)
					changeValue[2] = pickerValueDay.length - 1;
				if (this.pickerValueDay.length != pickerValueDay.length)
					this.pickerValueDay = pickerValueDay;
				this.pickerValue = changeValue;
			},
			pickerChangeMul(e) {
				if (this.deepLength === 2) {
					let pickerValueArray = this.pickerValueArray;
					let changeValue = e.mp.detail.value;
					// 处理第一列滚动
					if (changeValue[0] !== this.pickerValue[0]) {
						let pickerValueMulTwoTwo = [];
						// 第一列滚动第二列数据更新
						for (let i = 0, length = pickerValueArray[changeValue[0]].children.length; i < length; i++) {
							pickerValueMulTwoTwo.push(pickerValueArray[changeValue[0]].children[i]);
						}
						this.pickerValueMulTwoTwo = pickerValueMulTwoTwo;
						// 第二列初始化为 0
						changeValue[1] = 0;
					}
					this.pickerValue = changeValue;
				} else if (this.deepLength === 3) {
					let pickerValueArray = this.pickerValueArray;
					let changeValue = e.mp.detail.value;
					let pickerValueMulThreeTwo = [];
					let pickerValueMulThreeThree = [];
					// 重新渲染第二列
					// 如果是第一列滚动
					if (changeValue[0] !== this.pickerValue[0]) {
						this.pickerValueMulThreeTwo = [];
						for (let i = 0, length = pickerValueArray[changeValue[0]].children.length; i < length; i++) {
							pickerValueMulThreeTwo.push(pickerValueArray[changeValue[0]].children[i]);
						}
						// 重新渲染第三列
						for (let i = 0, length = pickerValueArray[changeValue[0]].children[0].children.length; i <
							length; i++) {
							pickerValueMulThreeThree.push(pickerValueArray[changeValue[0]].children[0].children[i]);
						}
						changeValue[1] = 0;
						changeValue[2] = 0;
						this.pickerValueMulThreeTwo = pickerValueMulThreeTwo;
						this.pickerValueMulThreeThree = pickerValueMulThreeThree;
					} else if (changeValue[1] !== this.pickerValue[1]) {
						// 第二列滚动
						// 重新渲染第三列
						this.pickerValueMulThreeThree = [];
						pickerValueMulThreeTwo = this.pickerValueMulThreeTwo;
						for (let i = 0, length = pickerValueArray[changeValue[0]].children[changeValue[1]].children.length; i <
							length; i++) {
							pickerValueMulThreeThree.push(pickerValueArray[changeValue[0]].children[changeValue[1]].children[
								i]);
						}
						changeValue[2] = 0;
						this.pickerValueMulThreeThree = pickerValueMulThreeThree;
					}
					this.pickerValue = changeValue;
				}
				let pickObj = {
					index: this.pickerValue,
					value: this._getPickerLabelAndValue(this.pickerValue, this.mode).value,
					label: this._getPickerLabelAndValue(this.pickerValue, this.mode).label
				};
				this.$emit('onChange', pickObj);
			},

			// 获取 pxikerLabel
			_getPickerLabelAndValue(value, mode) {
				let pickerLable;
				let pickerGetValue = [];
				// selector
				if (mode === 'selector') {
					pickerLable = this.pickerValueSingleArray[value].label;
					pickerGetValue.push(this.pickerValueSingleArray[value].value);
				} else if (mode === 'dateSelector') {
					pickerLable =
						`${this.pickerValueYear[value[0]].label}-${this.pickerValueMonth[value[1]].label}-${this.pickerValueDay[value[2]].label}`;
					pickerGetValue.push(this.pickerValueYear[value[0]].value);
					pickerGetValue.push(this.pickerValueMonth[value[1]].value);
					pickerGetValue.push(this.pickerValueDay[value[2]].value);
				} else if (mode === 'timeSelector') {
					pickerLable = `${this.pickerValueHour[value[0]].label}-${this.pickerValueMinute[value[1]].label}`;
					pickerGetValue.push(this.pickerValueHour[value[0]].value);
					pickerGetValue.push(this.pickerValueHour[value[1]].value);
				} else if (mode === 'multiSelector') {
					for (let i = 0; i < value.length; i++) {
						if (i > 0) {
							pickerLable += this.pickerValueMulArray[i][value[i]].label + (i === value.length - 1 ? '' :
								'-');
						} else {
							pickerLable = this.pickerValueMulArray[i][value[i]].label + '-';
						}
						pickerGetValue.push(this.pickerValueMulArray[i][value[i]].value);
					}
				} else if (mode === 'multiLinkageSelector') {
					/* eslint-disable indent */
					pickerLable =
						this.deepLength === 2 ?
						`${this.pickerValueMulTwoOne[value[0]].label}-${this.pickerValueMulTwoTwo[value[1]].label}` :
						`${this.pickerValueMulThreeOne[value[0]].label}-${this.pickerValueMulThreeTwo[value[1]].label}-${this.pickerValueMulThreeThree[value[2]].label}`;
					if (this.deepLength === 2) {
						pickerGetValue.push(this.pickerValueMulTwoOne[value[0]].value);
						pickerGetValue.push(this.pickerValueMulTwoTwo[value[1]].value);
					} else {
						pickerGetValue.push(this.pickerValueMulThreeOne[value[0]].value);
						pickerGetValue.push(this.pickerValueMulThreeTwo[value[1]].value);
						pickerGetValue.push(this.pickerValueMulThreeThree[value[2]].value);
					}
					/* eslint-enable indent */
				}
				return {
					label: pickerLable,
					value: pickerGetValue
				};
			},
			// 初始化 pickerValue 默认值
			_initPickerVale() {
				if (this.pickerValue.length === 0) {
					if (this.mode === 'selector') {
						this.pickerValue = [0];
					} else if (this.mode === 'multiSelector') {
						this.pickerValue = new Int8Array(this.pickerValueArray.length);
					} else if (
						this.mode === 'multiLinkageSelector' &&
						this.deepLength === 2
					) {
						this.pickerValue = [0, 0];
					} else if (
						this.mode === 'multiLinkageSelector' &&
						this.deepLength === 3
					) {
						this.pickerValue = [0, 0, 0];
					}
				}
			}
		}
	};
</script>

<style>
	.pickerMask {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
	}

	.mpvue-picker-content {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		transition: all 0.3s ease;
		transform: translateY(100%);
		z-index: 3000;
	}

	.mpvue-picker-view-show {
		transform: translateY(0);
	}

	.mpvue-picker__hd {
		display: flex;
		padding: 9px 15px;
		background-color: #fff;
		position: relative;
		text-align: center;
		font-size: 17px;
	}

	.mpvue-picker__hd:after {
		content: ' ';
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		border-bottom: 1px solid #e5e5e5;
		color: #e5e5e5;
		transform-origin: 0 100%;
		transform: scaleY(0.5);
	}

	.mpvue-picker__action {
		display: block;
		flex: 1;
		color: #1aad19;
	}

	.mpvue-picker__action:first-child {
		text-align: left;
		color: #888;
	}

	.mpvue-picker__action:last-child {
		text-align: right;
	}

	.picker-item {
		text-align: center;
		line-height: 40px;
		font-size: 16px;
	}

	.mpvue-picker-view {
		position: relative;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 238px;
		background-color: rgba(255, 255, 255, 1);
	}
</style>
