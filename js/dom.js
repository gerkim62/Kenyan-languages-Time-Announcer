const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const volumeInputEl = $('#voice-volume')
const volumeTextEl = $('#volume-text')
const playbackRateInputEl = $('#playback-speed')
const playbackRateTextEl = $('#playback-rate-text')
const languageFormEl = $('#language-form')
const timerFormEl = $('#timer-form')

const languageSelect = $('#language-select')
const timerDurationSelect = $('#timer-select')

const speakerEl = $('#speaker')
const announcerEl = $('#announcer')

const timerCounterEl = $('#timer-counter')
const timerInstructionEl = $('#instruction')
const countdownEl = $('#countdown')

const acceptResumeBtn = $('#accept-resume')
const denyResumeBtn = $('#deny-resume')

const resumeDiv = $('.resume-timer')

const timeStringEl = $('.time-string')

const sensitivityInputEl = $('#sensitivity')
const sensitivityTextEl = $('#sensitivity-text')

const spinnerEl = $('.spinner')