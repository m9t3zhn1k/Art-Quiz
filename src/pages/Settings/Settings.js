import SettingsElement from './Settings.html';
import './Settings.css';

export class Settings {
  constructor() {
  }

  async render () {
    return SettingsElement;
  }

  async after_render () {

    const closeBtn = document.querySelector('.settings__close');
    const buttonMinusTimer = document.querySelector('.settings__answer-time_minus');
    const buttonPlusTimer = document.querySelector('.settings__answer-time_plus');
    const counterTimer = document.querySelector('.settings__answer-time_counter');
    const progressVolume = document.querySelector('.settings__volume_range');
    const timeSwitcherStatus = document.querySelector('.settings__switcher-block_status');
    const timeSwitcher = document.querySelector('.settings__time-switcher').firstElementChild;
    const volumeBtnMute = document.querySelector('.button__volume_mute');
    const volumeBtnUnmute = document.querySelector('.button__volume_on');
    const defaultSettingsBtn = document.getElementById('settingsDefault');
    const saveSettingsBtn = document.getElementById('settingsSave');
    let isVolumeSwitcherOn = Boolean(localStorage.getItem('isVolumeSwitcherOn') === 'true');
    let volumeLevel = localStorage.getItem('volumeLevel') || 0.4;
    let isTimeSwitcherOn = Boolean(localStorage.getItem('isTimeSwitcherOn') === 'true');
    let roundTime = localStorage.getItem('roundTime') || 10;

    function plus5secToTimer() {
      counterTimer.value = counterTimer.value == 30 ? 30 : +counterTimer.value + 5;
      roundTime = counterTimer.value;
    }
    function minus5secToTimer() {
      counterTimer.value = counterTimer.value == 5 ? 5 : +counterTimer.value - 5;
      roundTime = counterTimer.value;
    }
    function volumeRange() {
      let value = progressVolume.value;
      if (!isVolumeSwitcherOn) {
        progressVolume.disabled = true;
        progressVolume.style.background = `linear-gradient(to right, #a86767 0%, #a86767 ${value*100}%, #7a7a7a ${value*100}%, #7a7a7a 100%)`;
      } else {
        progressVolume.disabled = false;
        progressVolume.style.background = `linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ${value*100}%, #A4A4A4 ${value*100}%, #A4A4A4 100%)`;
      }
    }
    function isTimeSwitcherChecked() {
      if (timeSwitcher.checked) {
        timeSwitcherStatus.textContent = 'On';
        isTimeSwitcherOn = true;
      } else {
        timeSwitcherStatus.textContent = 'Off';
        isTimeSwitcherOn = false;
      }
    }
    function setMute() {
      isVolumeSwitcherOn = false;
      volumeRange();
    }
    function setUnMute() {
      isVolumeSwitcherOn = true;
      volumeRange();
    }
    function setSettingsToDefault() {
      setMute();
      progressVolume.value = 0.4;
      volumeRange();
      volumeLevel = localStorage.getItem('volumeLevel');
      counterTimer.value = 10;
      roundTime = counterTimer.value;
      timeSwitcher.checked = false;
      isTimeSwitcherChecked();
      localStorage.setItem('roundTime', roundTime);
      localStorage.setItem('isVolumeSwitcherOn', isVolumeSwitcherOn);
      localStorage.setItem('volumeLevel', progressVolume.value);
      localStorage.setItem('isTimeSwitcherOn', isTimeSwitcherOn);
    }
    function saveSettings() {
      localStorage.setItem('roundTime', roundTime);
      localStorage.setItem('isVolumeSwitcherOn', isVolumeSwitcherOn);
      localStorage.setItem('volumeLevel', progressVolume.value);
      localStorage.setItem('isTimeSwitcherOn', isTimeSwitcherOn);
      goBack();
    }
    function goBack() {
      window.history.back();
    }

    timeSwitcher.checked = isTimeSwitcherOn;
    isTimeSwitcherChecked();
    progressVolume.value = volumeLevel;
    volumeRange();
    counterTimer.value = roundTime;

    buttonMinusTimer.addEventListener('click', minus5secToTimer);
    buttonPlusTimer.addEventListener('click', plus5secToTimer);
    progressVolume.addEventListener('mousemove', volumeRange);
    progressVolume.addEventListener('input', volumeRange);
    timeSwitcher.addEventListener('change', isTimeSwitcherChecked);
    volumeBtnMute.addEventListener('click', setMute);
    volumeBtnUnmute.addEventListener('click', setUnMute);
    defaultSettingsBtn.addEventListener('click', setSettingsToDefault);
    saveSettingsBtn.addEventListener('click', saveSettings);
    closeBtn.addEventListener('click', goBack);

  };
}
