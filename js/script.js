$(document).ready(function(){

    //ready

    //nojs
    $('body').removeClass('no-js');

    //------------------------------------------------------------------------//

    //fakelink
    $('a[href="#"]').on('click', function(event) {
        event.preventDefault();
    });

    //------------------------------------------------------------------------//

    $(document).on('click', '.toggle-password', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        if ( $(this).hasClass('active') ) {
            $('.input-password').each(function(index, el) {
                $(el).attr('type', 'text');
            });
        } else {
            $('.input-password').each(function(index, el) {
                $(el).attr('type', 'password');
            });
        }
    });

    //------------------------------------------------------------------------//

    jQuery.validator.addMethod("passwordCheckUppercase",
        function(value, element, param) {
            if (this.optional(element)) {
                return true;
            } else if (!/[A-Z]/.test(value)) {
                return false;
            }
            return true;
        }, "Password must contain at least one uppercase letter");

    jQuery.validator.addMethod("passwordCheckLowercase",
        function(value, element, param) {
            if (this.optional(element)) {
                return true;
            } else if (!/[a-z]/.test(value)) {
                return false;
            }
            return true;
        }, "Password must contain at least one lowercase letter");

    jQuery.validator.addMethod("passwordCheckNumbers",
        function(value, element, param) {
            if (this.optional(element)) {
                return true;
            } else if (!/[0-9]/.test(value) && !/[#?!@$%^&*-]/.test(value)) {
                return false;
            }
            return true;
        }, "Password must contain at least one number digit or special character");

    $('#acc-onboarding').validate({
        rules: {
            'acc-password': {
                'required': true,
                'minlength': 8,
                'passwordCheckUppercase': true,
                'passwordCheckLowercase': true,
                'passwordCheckNumbers': true,
            },
            'acc-confirm-password': {
                'required': true,
                'equalTo': '#acc-password'
            }
        },
        messages: {
            'acc-password': {
                'required': 'Create a password to continue',
                'minlength': 'Needs to be at least 8 characters'
            },
            'acc-confirm-password': {
                'required': 'Confirm a password to continue',
                'equalTo': 'Those passwords didn’t match. Try again'
            }
        },
        submitHandler: function(form) {
            window.location.href = 'disclaimer.html';
        }
    });

    //------------------------------------------------------------------------//

    $('#acc-review').validate({
        rules: {
            'acc-name': {
                'required': true
            },
            'acc-surname': {
                'required': true
            },
            'acc-email': {
                'required': true,
                'email': true
            }
        },
        messages: {
            'acc-name': {
                'required': 'Enter Name'
            },
            'acc-surname': {
                'required': 'Enter Surname'
            },
            'acc-email': {
                'required': 'Enter Email address',
                'email': 'Oops - incorrect email'
            }
        },
        submitHandler: function(form) {
            window.location.href = 'request-sent.html';
        }
    });

    //------------------------------------------------------------------------//

    $('#acc-set').validate({
        rules: {
            'acc-email': {
                'required': true,
                'email': true
            }
        },
        messages: {
            'acc-email': {
                'required': 'Enter Email address',
                'email': 'Oops - incorrect email'
            }
        },
        submitHandler: function(form) {
            window.location.href = 'onboarding.html';
        }
    });

    //------------------------------------------------------------------------//

    var validatorDisclaimer = $('#acc-disclaimer').validate({
        rules: {
            'disclaimer': {
                'required': true
            },
            'terms-and-conditions': {
                'required': true
            }
        },
        messages: {
            'disclaimer': {
                'required': 'Please review and accept the disclaimer to continue'
            },
            'terms-and-conditions': {
                'required': 'Please review and accept the terms and conditions to continue'
            }
        },
        errorPlacement: function(error, element) {
            if (element.attr("type") == "checkbox") {
                error.insertAfter(element.parents('.checkbox'));
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function(form) {
            $('#acc-disclaimer').find('input[type="checkbox"]:disabled').each(function(index, el) {
                $(this).prop('disabled', false);
                validatorDisclaimer.element($(this));
                $(this).prop('disabled', true);
            });

            if (validatorDisclaimer.numberOfInvalids() == 0) {
                window.location.href = 'language.html';
            }
        }
    });

    //------------------------------------------------------------------------//

    $('.checkbox-group-content').on('scroll', function(event) {
        if ( $(this).scrollTop() + 20 >= $(this).prop('scrollHeight') - $(this).innerHeight() ) {
            $(this).parents('.checkbox-group').find('input').prop('disabled', false);
        }
    });

    //------------------------------------------------------------------------//

    $('#acc-lang').validate({
        submitHandler: function(form) {
            window.location.href = 'info.html';
        }
    });

    //------------------------------------------------------------------------//

    $('.input-tags').amsifySuggestags();

    //------------------------------------------------------------------------//

    $('#acc-info').validate({
        submitHandler: function(form) {
            window.location.href = 'avatar.html';
        }
    });

    //------------------------------------------------------------------------//

        function demoUpload() {
            var $uploadCrop;

            function readFile(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        $('.upload-demo').addClass('ready');
                        $uploadCrop.croppie('bind', {
                            url: e.target.result
                        }).then(function(){
                            console.log('jQuery bind complete');
                        });

                    }

                    reader.readAsDataURL(input.files[0]);
                }
                else {
                    swal("Sorry - you're browser doesn't support the FileReader API");
                }
            }

            $uploadCrop = $('#upload-demo').croppie({
                viewport: {
                    width: 198,
                    height: 198,
                    type: 'circle'
                },
                boundary: {
                    width: 382,
                    height: 261
                },
                enableExif: true
            });

            $('#upload').on('change', function () {
                readFile(this);
            });
            $('.upload-result').on('click', function (event) {
                event.preventDefault();
                $uploadCrop.croppie('result', {
                    type: 'canvas',
                    size: 'viewport'
                }).then(function (resp) {
                    $('.upload-file-result').css({
                        'background-image': 'url('+resp+')'
                    });
                    $('.upload-file-result').removeClass('upload-file-result-default');
                    $('#modal-file').modal('hide');
                    $('.upload-list-item-default').removeClass('active');
                });
            });

            $(document).on('click', '.upload-minus', function(event) {
                event.preventDefault();
                var thisFileSlider = $('.cr-slider'),
                    currentMin = thisFileSlider.prop('min'),
                    currentMax = thisFileSlider.prop('max'),
                    currentValue = thisFileSlider.val(),
                    stepSlide = (currentMax - currentMin) / 20;
                if (currentValue-stepSlide > currentMin) {
                    thisFileSlider.val(currentValue-stepSlide);
                    $('#upload-demo').croppie('setZoom', currentValue-stepSlide);
                } else {
                    thisFileSlider.val(currentMin);
                    $('#upload-demo').croppie('setZoom', currentMin);
                }
            });

            $(document).on('click', '.upload-plus', function(event) {
                event.preventDefault();
                var thisFileSlider = $('.cr-slider'),
                    currentMin = thisFileSlider.prop('min'),
                    currentMax = thisFileSlider.prop('max'),
                    currentValue = thisFileSlider.val(),
                    stepSlide = (currentMax - currentMin) / 20;

                console.log(currentMin, currentMax, currentValue, stepSlide);

                if (currentValue+stepSlide < currentMax) {
                    thisFileSlider.val(parseFloat(currentValue) + parseFloat(stepSlide));
                    $('#upload-demo').croppie('setZoom', parseFloat(currentValue) + parseFloat(stepSlide));
                } else {
                    thisFileSlider.val(currentMax);
                    $('#upload-demo').croppie('setZoom', currentMax);
                }
            });

        }

        demoUpload();

        $(document).on('change', '#upload', function(event) {
            $('#modal-file').modal('show');
        });

    //------------------------------------------------------------------------//

    $('#acc-avatar').validate({
        submitHandler: function(form) {
            window.location.href = 'all-set.html';
        }
    });

    $(document).on('click', '.upload-list-item-default', function(event) {
        event.preventDefault();
        $('.upload-list-item-default').removeClass('active');
        $(this).addClass('active');
    });

    //------------------------------------------------------------------------//

    $('#reset-password').validate({
        rules: {
            'acc-password': {
                'required': true,
                'minlength': 8,
                'passwordCheckUppercase': true,
                'passwordCheckLowercase': true,
                'passwordCheckNumbers': true,
            },
            'acc-confirm-password': {
                'required': true,
                'equalTo': '#acc-password'
            }
        },
        messages: {
            'acc-password': {
                'required': 'Create a password to continue',
                'minlength': 'Needs to be at least 8 characters'
            },
            'acc-confirm-password': {
                'required': 'Confirm a password to continue',
                'equalTo': 'Those passwords didn’t match. Try again'
            }
        },
        submitHandler: function(form) {
            window.location.href = 'reset-done.html';
        }
    });

    //------------------------------------------------------------------------//

    if ($('#redirected-to-log-in').length) {
        setTimeout(function(){
            window.location.href = 'login.html';
        }, 2000);
    }



});//document ready

//*********************************************************************//

$(window).load(function() {

    //load

});//window load

//*********************************************************************//

$(window).resize(function() {

    //resize

});//window resize