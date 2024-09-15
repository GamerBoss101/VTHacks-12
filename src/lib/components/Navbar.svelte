<script>
    import { page } from '$app/stores';
</script>

<nav class="navbar navbar-expand-md sticky-top py-3 navbar-dark" id="mainNav">
    <div class="container"><a class="navbar-brand d-flex align-items-center" href="/">
        <span>Food Decisive</span></a>
        <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navcol-1">
            <ul class="navbar-nav mx-auto">
                <li class="nav-item"><a class="nav-link active" href="/">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="/survey">Survey</a></li>
                <li class="nav-item"><a class="nav-link" href="/contacts">Contact Us</a></li>
            </ul>
            { #if $page.data.authInfo }
                <a class="btn btn-primary shadow" role="button" href="https://auth.fooddecisive.co/account" style="background: rgb(55, 99, 244);">Dashboard</a>
            { :else }
                <a class="btn btn-primary shadow" role="button" href="https://auth.fooddecisive.co/" style="background: rgb(55, 99, 244);">Sign up</a>
            { /if }
        </div>
    </div>
</nav>